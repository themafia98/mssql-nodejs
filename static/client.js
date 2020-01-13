"use strict";

(() => {

    const setError = (error, event, content) => {
        console.error(error);
        event.target.removeAttribute("disabled");
        content.innerHTML = "Error request";
    }

    document.addEventListener("DOMContentLoaded", () => {
        const content = document.querySelector(".procedureResult");
        const chartsContainer = document.getElementById("chartsContainer");

        document.addEventListener("click", async (event) => {

            if (event.target.className === "loadMiddleValue"){
                try {
                event.target.setAttribute("disabled", true);
                const response = await fetch("/api/calcTemp");
                
                if (response.ok){
                    const body = JSON.parse(await response.json());
                    event.target.removeAttribute("disabled");
                    content.innerHTML = body.result ? body.result : JSON.stringify(body);
                    chartsContainer.innerHTML = "";
                }

                } catch (error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
                    chartsContainer.innerHTML = "";
                }
                return;
            } else if (event.target.className === "reset"){
                content.innerHTML = "NO DATA";
                chartsContainer.innerHTML = "";
            } else if (event.target.className === "loadTemp"){
                try {

                    const startDate = document.querySelector(".startDate");
                    const endDate = document.querySelector(".endDate");
                    const startTime = document.querySelector(".startTime");
                    const endTime = document.querySelector(".endTime");

                    if (!startDate.value || !endDate.value || !startTime.value || !endTime.value) return;

                    const validBody = {
                        startDate: new Date(startDate.value),
                        endDate: new Date(endDate.value),
                        startTime: startTime.value,
                        endTime: endTime.value,
                    };
                    event.target.setAttribute("disabled", true);
                    const response = await fetch("/api/rangeTemp", 
                        { method: "POST", body: JSON.stringify(validBody), 
                        cache: 'no-cache',
                        headers:{
                            'Content-Type': "application/json"
                        }
                        });

                    if (response.ok){
                        const result = JSON.parse(await response.json());
                        event.target.removeAttribute("disabled");
                        content.innerHTML = result.length ? result.reduce((html, current) => {
                            if (!current.nameSensor || !current.date || !current.time || !current.temp){
                                return html + `<div>Invalid data</div>`;
                            }
                            return html + `
                                <div>
                                    <p>nameSensor: ${current.nameSensor.trim()}</p>
                                    <p>date: ${current.date.trim()}</p>
                                    <p>time: ${current.time.trim()}</p>
                                    <p>temp: ${current.temp.trim()}</p>
                                </div>
                                `;
                        },"") : "Not found";

                        let data = [
                            {
                              x: result.sort((a,b) => {
                                    const arrB = b.date.trim().split("-");
                                    const arrA = a.date.trim().split("-");
                                    const dateB = new Date(arrB[2], Number(arrB[1]) - 1, arrB[0]);
                                    const dateA = new Date(arrA[2], Number (arrA[1]) - 1, arrA[0]);
                                  return dateA - dateB;
                              }).map(it => { console.log(it); return `${it.date.trim()} ${it.time.trim()}`; }),
                              y: result.map(it => it.temp),
                              type: 'scatter'
                            }
                          ];

                        let layout = {
                            showlegend: false
                        };

                        let plotConfig = {
                            displayModeBar: false
                        }
                          
                        if (data[0].x.length){
                          return Plotly.newPlot('chartsContainer', data, layout, plotConfig);
                        } else chartsContainer.innerHTML = "";
                    }

                } catch(error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
                    chartsContainer.innerHTML = "";
                }
            } else if (event.target.className === "loadMaxMinTemp"){
                try {
                    const startTime = document.querySelector(".startTimeMaxMin");
                    const endTime = document.querySelector(".endTimeMaxMin");

                    if (!startTime.value || !endTime.value) return;

                    const validBody = {
                        startTime: startTime.value,
                        endTime: endTime.value,
                    };
                    event.target.setAttribute("disabled", true);
                    const response = await fetch("/api/minMaxTemp", 
                        { method: "POST", body: JSON.stringify(validBody), 
                        cache: 'no-cache',
                        headers:{
                            'Content-Type': "application/json"
                        }
                        });

                    if (response.ok){
                        const result = JSON.parse(await response.json());
                        event.target.removeAttribute("disabled");
                        let isInitNotFound = false;
                        content.innerHTML = result.reduce((html, collection) => {
                            //if (!Array.isArray(collection)) return html + "<div>Bad request</div>";
                            const current = collection;
                       
                            if (!current || !current.timeInd  || !current.name) {
                                const returnHtml = !isInitNotFound ? html + "<div>Not found</div>" : html;
                                isInitNotFound = true;
                                return returnHtml;
                            }
                            const currentKeys = Object.keys(current);

                            const isMax = currentKeys.includes("maxTemp");
                            const isMin = currentKeys.includes("minTemp");

                            if (isMax && current && current.name){
                                return html +  `
                                    <div>
                                        <p>name: ${current.name.trim()}</p>
                                        <p>maxTemp: ${current.maxTemp}</p>
                                        <p>time: ${current.timeInd}</p>
                                    </div>
                                `;
                            } else if (isMin && current && current.name){
                                return html + `
                                    <div>
                                        <p>name: ${current.name.trim()}</p>
                                        <p>minTemp: ${current.minTemp}</p>
                                        <p>time: ${current.timeInd}</p>
                                    </div>
                                `;
                            }

                            return html;
                        },"");
                        chartsContainer.innerHTML = "";
                        event.target.removeAttribute("disabled");
                    }

                } catch(error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
                    chartsContainer.innerHTML = "";
                }
            } else if (event.target.className === "loadLocation"){
                try {
                    const regionNumberVal = document.querySelector(".regionNumber");
                    const regionNumber = regionNumberVal ? Number(regionNumberVal.value) : null; 
                    if (!regionNumber  || isNaN(regionNumber) || regionNumber < 0) return;

                    const validBody = {
                        regionNumber
                    };

                    event.target.setAttribute("disabled", true);
                    const response = await fetch("/api/sensorLocation", 
                        { method: "POST", body: JSON.stringify(validBody), 
                        cache: 'no-cache',
                        headers:{
                            'Content-Type': "application/json"
                        }
                        });

                    if (response.ok){
                        const result = JSON.parse(await response.json());
                        event.target.removeAttribute("disabled");
                        content.innerHTML = result.length ? result.reduce((html, current) => {
                            const newHtml = html + `
                            <div>
                                <p>sensorName: ${current.sensorName.trim()}</p>
                                <p>region: ${current.region.trim()}</p>
                            </div>
                            `;
                            return newHtml;
                        },"") : "Not found";
                        chartsContainer.innerHTML = "";
                    }

                } catch(error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
                    chartsContainer.innerHTML = "";
                }
            }
        }, false);

    }, false);

})();