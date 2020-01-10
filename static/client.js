"use strict";

(() => {

    const setError = (error, event, content) => {
        console.error(error);
        event.target.removeAttribute("disabled");
        content.innerHTML = "Error request";
    }

    document.addEventListener("DOMContentLoaded", () => {
        const content = document.querySelector(".procedureResult");

        document.addEventListener("click", async (event) => {

            if (event.target.className === "loadMiddleValue"){
                try {
                event.target.setAttribute("disabled", true);
                const response = await fetch("/api/calcTemp");
                
                if (response.ok){
                    const body = JSON.parse(await response.json());
                    event.target.removeAttribute("disabled");
                    content.innerHTML = body.result ? body.result : JSON.stringify(body);
                }

                } catch (error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
                }
                return;
            } else if (event.target.className === "reset"){
                content.innerHTML = "NO DATA";
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
                            const newHtml = html + current.nameSensor && current.time &&
                                current.temp ? `
                                <div>
                                    <p>nameSensor: ${current.nameSensor.trim()}</p>
                                    <p>date: ${current.date.trim()}</p>
                                    <p>time: ${current.time.trim()}</p>
                                    <p>temp: ${current.temp.trim()}</p>
                                </div>
                                ` : "Not found";
                            return newHtml;
                        },"") : "Not found";
                    }

                } catch(error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
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
                        content.innerHTML = result.reduce((html, current) => {
                            const newHtml = html + current.minTemp && current.maxTemp ? `
                            <div>
                                <p>minTemp: ${current.minTemp.trim()}</p>
                                <p>maxTemp: ${current.maxTemp.trim()}</p>
                            </div>
                            ` : "Not found";
                            return newHtml;
                        },"");
                    }

                } catch(error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
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
                            const newHtml = html + current.sensorName && current.region ? `
                            <div>
                                <p>sensorName: ${current.sensorName.trim()}</p>
                                <p>region: ${current.region.trim()}</p>
                            </div>
                            ` : "Not found";
                            return newHtml;
                        },"") : "Not found";
                    }

                } catch(error){
                    event.target.removeAttribute("disabled");
                    setError(error, event, content);
                }
            }
        }, false);

    }, false);

})();