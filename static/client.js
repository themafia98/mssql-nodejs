"use strict";

(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const content = document.querySelector(".procedureResult");

        document.addEventListener("click", async (event) => {

            if (event.target.className === "loadMiddleValue"){
                try {
                const response = await fetch("/api/calcTemp");
                
                if (response.ok){
                    const body = JSON.parse(await response.json());

                    content.innerHTML = body.result ? body.result : JSON.stringify(body);
                }

                } catch (error){
                    console.error(error);
                    content.innerHTML = "Error request";
                }
                return;
            } else if (event.target.className === "reset"){
                content.innerHTML = "NO RESULT";
            }
        }, false);

    }, false);

})();