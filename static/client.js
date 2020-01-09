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
                    setError(error, event, content);
                }
                return;
            } else if (event.target.className === "reset"){
                content.innerHTML = "NO RESULT";
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

                    const response = await fetch("/api/rangeTemp", 
                        { method: "POST", body: JSON.stringify(validBody), 
                        cache: 'no-cache',
                        headers:{
                            'Content-Type': "application/json"
                        }
                        });

                    if (response.ok){
                        const result = JSON.parse(await response.json());
                        content.innerHTML = result.reduce((html, current) => {
                            const newHtml = html + `
                            <div>
                                <p>nameSensor: ${current.nameSensor.trim()}</p>
                                <p>date: ${current.date.trim()}</p>
                                <p>time: ${current.time.trim()}</p>
                            </div>
                            `;
                            return newHtml;
                        },"");
                    }

                } catch(error){
                    setError(error, event, content);
                }
            }
        }, false);

    }, false);

})();