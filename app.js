'use strict'
//------------------------------- Variables -------------------------------

let hiddenColors, selectedColors, 
    attemptsList, lives,
    marksList, hiddenColorsTemp,
    colorsCheck, answerCheck;

//------------------------------- Execution -------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.viewer .dot');
    const attemptsViewers = document.querySelector('.attempts');
    const endScreen = document.querySelector('.end-screen')

    const colorsBtn = document.querySelectorAll('.cbtn')
    const deleteBtn = document.querySelector('.delete');
    const checkBtn = document.querySelector('.submit');
    
    hiddenColors = [];
    selectedColors = [];
    attemptsList = [];
    
    lives = 12;

    for (let i = 0; i < 4; i++) {
        let temp = Math.floor(Math.random()*5);
        switch (temp) {
            case 0:
                hiddenColors.push('yellow');
                break;
            case 1:
                hiddenColors.push('blue');
                break;
            case 2:
                hiddenColors.push('red');
                break;
            case 3:
                hiddenColors.push('green');
                break;
            case 4:
                hiddenColors.push('pink');
                break;
            case 5:
                hiddenColors.push('white');
                break;
        }

        if (hiddenColors.length > 1) {
            for(let j = 0; j < hiddenColors.length-1; j++) {
                if (hiddenColors[hiddenColors.length-1] === hiddenColors[j]) {
                    i--;
                    hiddenColors.pop();
                    continue;
                }
            }
        }
        
    }
    
    colorsBtn.forEach((el) => {
        el.addEventListener('click', () => {
            selectedColors.push(`${el.classList[1]}`);
            if (selectedColors.length > 4) selectedColors.pop();
            for(let i = 0; i < selectedColors.length; i++) {
                dots[i].classList.add(selectedColors[i]);
            }
        });
    });

    deleteBtn.addEventListener('click', () => {
        if (selectedColors.length >= 1) {
            dots[selectedColors.length-1].classList.remove(selectedColors[selectedColors.length-1]);
            selectedColors.pop();
        }
    });

    checkBtn.addEventListener('click', () => {
        let answerCheck = true; 
        hiddenColors.forEach((e, k) => {
            if (hiddenColors[k] !== selectedColors[k]) {
                answerCheck = false;
            }
        });

        if (!answerCheck && selectedColors.length === 4 && lives > 0) { 
            marksList = [];
            hiddenColorsTemp = new Array(4);
            attemptsList.push(new Array());

            for (let i = 0; i < 4; i++) {
                hiddenColorsTemp[i] = hiddenColors[i];
            }

            for (let i = 0; i < 4; i++) {
                let markCheck = 2;
                for (let j = 0; j < 4; j++) {
                    if (selectedColors[i] === hiddenColorsTemp[j]) {
                        if(i !== j) {
                            markCheck = 1
                            hiddenColorsTemp[j] = 0;
                            
                        }
                        if (i === j) {
                            markCheck = 0
                            hiddenColorsTemp[j] = 0;
                            break;
                        }
                    }
                }
                marksList.push(markCheck);
            }

            marksList.sort();

            for (let i = 0; i < marksList.length; i++) {
                if (marksList[i] === 0) {
                    marksList[i] = 'mark-pos-good';
                } else if (marksList[i] === 1) {
                    marksList[i] = 'mark-good';
                } else if (marksList[i] === 2) {
                    marksList[i] = '';
                } 
            }
            
            attemptsViewers.insertAdjacentHTML('afterbegin', 
                `<div class="attempt-component">
                    <div class="dots">
                        <div class="dot ${selectedColors[0]}"></div>
                        <div class="dot ${selectedColors[1]}"></div>
                        <div class="dot ${selectedColors[2]}"></div>
                        <div class="dot ${selectedColors[3]}"></div>
                    </div>
                    <div class="marks">
                        <div class="mark ${marksList[0]}"></div>
                        <div class="mark ${marksList[1]}"></div>
                        <div class="mark ${marksList[2]}"></div>
                        <div class="mark ${marksList[3]}"></div>
                    </div>
                </div>`
            )
            
            for (let i = 0; i < 4; i++) {
                attemptsList[attemptsList.length-1][i] = selectedColors[i];
            }

            for (let i = selectedColors.length - 1; i >= 0; i--) {
                dots[selectedColors.length-1].classList.remove(selectedColors[selectedColors.length-1]);
                selectedColors.pop();
            }
        } else if (answerCheck && lives > 0) {
            endScreen.style.visibility = "visible";
            endScreen.innerHTML = `
            <div>
                <h3>YOU WIN !</h3>
                <div class="actions-btn">
                    <button class="continue-btn">CONTINUE</button>
                    <button class="quit-btn">QUIT</button>
                </div>
            </div>
            `
        }
    });
});