// --------------------------------------------------------------------
const oneUnitArr = [...document.querySelectorAll(".one-unit")];
const blockDownPos = {x: 0, y: 0};
const blockBasicPos = {x: 0, y: 0};
let blockDx, blockDy;
let blockMovable = false;
let target = null;
let blockGap = 16;
let blockWidth = 0;
let targetIndex = 0;
let currentPosIndex = 0;
let moveStep = 0;

const handleBlockDown = (e) => {
    if (!e.currentTarget.classList.contains("add-unit")) {
        // clickTimeId = setTimeout(() => {
        //     clickable = false;
        // }, 200);

        blockMovable = true;
        blockDownPos.x = e.clientX;
        blockDownPos.y = e.clientY;
        target = e.currentTarget;

        const oneUnitArr = [...document.querySelectorAll(".one-unit")];
        oneUnitArr.forEach((item, index) => {
            if (item === e.currentTarget) {
                targetIndex = index;
                currentPosIndex = index;
            }
        })

        target.style.transition = "none";
        target.style.zIndex = 10;

        blockWidth = target.getBoundingClientRect().width;

    }
    
}

const changePos = (oneUnitArr, dx, moveWidth) => {
    moveStep = parseInt(dx / moveWidth);
    currentPosIndex = targetIndex + moveStep;

    for (let i = 0; i < oneUnitArr.length; i++) {
        if (i !== targetIndex) {
            oneUnitArr[i].style.transform = `translateX(0)`;
        }
    }

    if (moveStep > 0) {
        const moveCount = moveStep;
        for (let i = 1; i <= moveCount; i ++ ) {
            // if (targetIndex + i !== oneUnitArr.length - 1) {
            //     oneUnitArr[targetIndex + i] ? (oneUnitArr[targetIndex + i].style.transform = `translateX(-${moveWidth}px)`) : "";
            //     console.log(oneUnitArr[targetIndex + i]);
            // }

            if (targetIndex + i < oneUnitArr.length - 1) {
                oneUnitArr[targetIndex + i].style.transform = `translateX(-${moveWidth}px)`;
                console.log(oneUnitArr[targetIndex + i]);
            }

        }
    }
    else if (moveStep < 0) {
        const moveCount = -moveStep;
        for (let i = 1; i <= moveCount; i ++ ) {
            // oneUnitArr[targetIndex - i] ? (oneUnitArr[targetIndex - i].style.transform = `translateX(${moveWidth}px)`) : "";
            if (targetIndex - i >= 0) {
                oneUnitArr[targetIndex - i].style.transform = `translateX(${moveWidth}px)`;
            }
        }
    }
} 

const handleBlockMove = (e) => {
    if (blockMovable && target.classList.contains("selected-unit")) {
        blockDx = blockBasicPos.x + e.clientX - blockDownPos.x;
        blockDy = blockBasicPos.y + e.clientY - blockDownPos.y;
        target.style.transform = `translate(${blockDx}px, ${blockDy}px)`
        changePos([...document.querySelectorAll(".one-unit")], blockDx, blockGap + blockWidth);
    }
}

const handleBlockUp = (e) => {

    if (!e.currentTarget.classList.contains("add-unit")) {
        // clearTimeout(clickTimeId);
        // setTimeout(() => {
        //     clickable = true;
        // })

        blockMovable = false;

        const oneUnitArr = [...document.querySelectorAll(".one-unit")];
        if (targetIndex + moveStep < 0) {
            moveStep = -targetIndex;
        }
        else if (targetIndex + moveStep > oneUnitArr.length - 2) {
            moveStep = oneUnitArr.length - 2 - targetIndex;
        }

        target.style.transition = `all 0.2s ease-in-out`;
        target.style.zIndex = 0;
        target.style.transform = `translateX(${moveStep * (blockWidth + blockGap)}px)`;

        moveStep = 0;

    }
    
}

const handleTransitionEnd = (e) => {
    if (e.currentTarget === target) {
        if (currentPosIndex !== targetIndex) {
            const oneUnit = document.querySelectorAll(".one-unit");

            if (currentPosIndex < 0) {
                currentPosIndex = 0;
            }
            else if (currentPosIndex > oneUnit.length - 2) {
                currentPosIndex = oneUnit.length - 2;
            }

            if (currentPosIndex < targetIndex) {
                target.parentNode.insertBefore(target, oneUnit[currentPosIndex]);
            }
            else {
                target.parentNode.insertBefore(target, oneUnit[currentPosIndex + 1]);
            }
    
            const oneUnitArr = [...oneUnit];
            oneUnitArr.forEach((item) => {
                item.style.transition = "none";
                item.style.transform = "translate(0px)";
            })

            setTimeout(() => {
                oneUnitArr.forEach((item) => {
                    item.style.transition = "all 0.2s ease-in-out";
                })
            });
    
        }

       
    }
}

oneUnitArr.forEach((item) => {
    item.addEventListener("mouseup", handleBlockUp);
    item.addEventListener("mousedown", handleBlockDown);
    item.addEventListener("transitionend", handleTransitionEnd);
})

document.body.addEventListener("mousemove", handleBlockMove);

// ---------------------------------------------------------------------
const navBar = document.querySelector(".bar");
const container = document.querySelector(".container");
const mousedownPos = {x: 0, y: 0};
const basicPos = {x: 0, y: 0};
let dx, dy;
let movable = false;

navBar.addEventListener("mousedown", (e) => {
    mousedownPos.x = e.clientX;
    mousedownPos.y = e.clientY;
    movable = true;
})

document.body.addEventListener("mousemove", (e) => {
    if (movable) {
        dx = basicPos.x + e.clientX - mousedownPos.x;
        dy = basicPos.y + e.clientY - mousedownPos.y;
       container.style.transform = `translate(${dx}px, ${dy}px)`
    }
})

navBar.addEventListener("mouseup", (e) => {
    movable = false;
    basicPos.x = dx;
    basicPos.y = dy;
})

//----------------------------------------------------------------

// let clickable = true;
// let clickTimeId;
const type = ["BTC", "LTC", "XRP", "BLT", "CNY"]


const handleClick = (e) => {
    // if (!clickable) {
    //     return;
    // }

    if (e.currentTarget.classList.contains("add-unit")) {
        const rootDiv = document.createElement("div");
        rootDiv.classList.add("one-unit");

        const span = document.createElement("span");
        span.classList.add("currency");
        const index = Math.floor(Math.random() * type.length);
        span.innerHTML = `${type[index]}`;

        const div = document.createElement("div");
        const spanInner1 = document.createElement("span");
        spanInner1.classList.add("num");
        const num = Math.floor(Math.random() * 101);
        spanInner1.innerHTML = `${num}`;
        const text = document.createTextNode("\n")
        const spanInner2 = document.createElement("span");
        spanInner2.classList.add("symbol");
        spanInner2.innerHTML = "%";

        div.appendChild(spanInner1);
        div.appendChild(text)
        div.appendChild(spanInner2);
        rootDiv.appendChild(span);
        rootDiv.appendChild(div);
        e.currentTarget.parentNode.insertBefore(rootDiv, e.currentTarget);

        rootDiv.addEventListener("click", handleClick);
        rootDiv.addEventListener("mouseup", handleBlockUp);
        rootDiv.addEventListener("mousedown", handleBlockDown);
        rootDiv.addEventListener("transitionend", handleTransitionEnd);

    }
    else {
        const oneUnitArr = [...document.querySelectorAll(".one-unit")];
        oneUnitArr.forEach((item) => {
            item.classList.remove("selected-unit");
        })
        e.currentTarget.classList.toggle("selected-unit");

    }

}

oneUnitArr.forEach((item) => {
    item.addEventListener("click", handleClick)
})

