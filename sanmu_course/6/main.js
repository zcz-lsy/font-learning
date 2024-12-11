const todoCard = document.querySelector(".todo-card")
todoCard.remove();
const doneCard = document.querySelector(".done-card");
doneCard.remove();

class InputBar {
    constructor() {
        this.inputEle = document.querySelector("input");
        this.buttons = document.querySelector(".input-buttons");
        this.init();
    }

    init() {
        this.inputEle.addEventListener("focus", (e) => {
            e.currentTarget.classList.add("input-focus");
            e.currentTarget.setAttribute("placeholder", "请输入你的待办事项");
            this.buttons.style.opacity = 1;
        })

        this.inputEle.addEventListener("blur", (e) => {
            e.currentTarget.classList.remove("input-focus");
            e.currentTarget.setAttribute("placeholder", "Add new task");
            this.buttons.style.opacity = 0;
        })

        this.inputEle.addEventListener("keyup", (e) => {
            if (e.key == "Enter") {
                if (this.inputEle.value) {
                    console.log(this.inputEle.value);
                    new ToDoCard(todoCard, null, this.inputEle.value, true);
                    this.inputEle.value = "";
                }
            }
        })
    }
}

const inputBarInstance = new InputBar();

class Button {
    constructor(className, inputBar) {
        this.btn = document.querySelector(className);
        this.btnType = className.includes("confirm") ? "confirm": "cancel";
        this.inputBar = inputBar;
        this.init();
    }

    init() {
        // 这里不能用click，因为mousedown时焦点就已经改变了，而click处理函数要mouseup后才能触发。
        this.btn.addEventListener("mousedown", (e) => {
            if (this.btnType === "confirm") {
                // 阻止mousedown的默认行为：改变原来元素的焦点。
                e.preventDefault();
                // 如何知道输入框里有没有东西?
                if (this.inputBar.inputEle.value) {
                    new ToDoCard(todoCard, null, this.inputBar.inputEle.value, true);
                    this.inputBar.inputEle.value = "";
                }
            }
            else {
                this.inputBar.inputEle.value = "";
            }

        })
    }
}

new Button(".confirm-btn", inputBarInstance);
new Button(".cancel-btn", inputBarInstance);

class ToDoCard {
    constructor(card, colorIndex, cardText, isCreated) {
        this.card = card.cloneNode(true);
        this.clickCount = 0;
        this.clickTimeId = 0;
        this.cardColors = ["orange", "qing", "green", "yellow", "purple"];
        this.colorIndex = colorIndex !== null ? colorIndex: null;
        this.cardText = cardText !== null ? cardText: null;
        this.stateCard = {
            isFav: false,
        }
        this.isCreated = isCreated;

        this.editBlock = this.card.querySelector(".edit-block")
        this.cardContainer = document.querySelector(".todo-card-container");
        this.iconBoxs = [...this.card.querySelectorAll(".icon-box")];
        this.doneIconBox = this.card.querySelector(".done-icon-box");
        this.colorBoard = this.card.querySelector(".color-board");
        this.colorDots = this.card.querySelector(".color-dot");
        this.deleteId = 0;
        this.num = document.querySelector(".todo-num");
        this.init();
    }

    init() {
        // 卡片颜色
        if (this.colorIndex === null) {
            this.colorIndex = Math.floor(Math.random() * this.cardColors.length); 
        }
        this.card.classList.remove("card-orange");
        this.card.classList.add("card-" + this.cardColors[this.colorIndex]);

        // 卡片文字
        if (this.cardText !== null) {
            this.editBlock.innerText = this.cardText;
        }

        // 生成添加元素
        this.appendCard(this.isCreated);
        this.dbEdit();
        this.changeShaow();

        this.card.addEventListener("mouseenter", (e) => {
            this.iconBoxs.forEach((item) => {
                item.classList.remove("icon-box-init");
            });
            this.doneIconBox.classList.remove("done-icon-box-init");
        })

        this.card.addEventListener("mouseleave", (e) => {

            this.iconBoxs.forEach((item, index) => {
                if (this.stateCard.isFav && index === 3) {
                    return;
                }
                item.classList.add("icon-box-init");
            })
            this.doneIconBox.classList.add("done-icon-box-init");
        })

        this.changeColor();
        this.isImportant();
        this.delete();
        this.edit();
        this.finish();
    }

    appendCard(isCreated) {
        this.cardContainer.appendChild(this.card);
        this.updateNum();
        // 延迟DOM更新：在将新卡片 this.card 添加到 this.cardContainer 后，
        // 使用 setTimeout 来延迟一些视觉效果的更新。这可以确保DOM更新已经完成，然后才应用额外的类或动画。
        setTimeout(() => {
            if (isCreated) {
                this.card.classList.remove("card-add-init");
            }
            else {
                this.card.classList.add("done-card-to-ani");
                // 动画完成后的清理, 这通常用于确保动画有足够的时间完成，然后清理不再需要的类
                setTimeout(() => {
                    this.card.classList.remove("done-card-to-ani", "card-add-init");
                }, 1600)

            }

        })
    }

    changeShaow() {
        // card得到焦点后会有阴影
        this.editBlock.addEventListener("focus", (e) => {
            this.card.classList.add("shadow-" + this.cardColors[this.colorIndex])
        })

        this.editBlock.addEventListener("blur", (e) => {
            this.card.classList.remove("shadow-" + this.cardColors[this.colorIndex]);
        })
    }

    dbEdit() {
        // 双击才能编辑
        this.card.addEventListener("mousedown", (e) => {
            clearTimeout(this.clickTimeId);
            if (this.clickCount === 0) {
                e.preventDefault();
                this.clickCount ++;
                // 在特定时间间隔内才能执行特定的操作, setTimeout 可以提供这种时间控制
                this.clickTimeId = setTimeout(() => {
                    this.clickCount = 0;
                }, 300);
            }
            else {
                this.editBlock.focus();
                this.clickCount = 0;
            }
        });
    }

    changeColor() {
        this.iconBoxs[1].addEventListener("click", (e) => {
            this.colorBoard.classList.toggle("color-board-init");
        })

        // 因为colorBoard上有click事件的响应函数，所以当点击那个小颜色的时候就会触发
        // 处理完后，该事件会冒泡到父元素，也就是iconBoxs中，会触发该元素的click响应函数。
        // 所以要阻止冒泡。
        this.colorBoard.addEventListener("click", (e) => {
            // e.stopPropagation();
            if (e.target.classList.contains("color-dot")) {
                const templateName = this.card.classList[0];
                const colorName = e.target.classList[1];
                const color = colorName.split("-")[1];
                this.cardColors.forEach((item, index) => {
                    if (item === color) {
                        this.colorIndex = index;
                        return;
                    }
                })

                if (this.card.className.includes("shadow-"))
                {
                    this.card.className = templateName + " " + colorName;
                    this.card.classList.add("shadow-" + this.cardColors[this.colorIndex])
                }
                else {
                    this.card.className = templateName + " " + colorName;
                }

 
            }
        })
    }

    isImportant() {
        this.iconBoxs[3].addEventListener("click", (e) => {
            this.stateCard.isFav = !this.stateCard.isFav;
            e.currentTarget.children[0].children[1].style.fill = this.stateCard.isFav ? "#EDCE46" : "white";
        })
    }

    delete() {
        this.iconBoxs[0].addEventListener("mousedown", (e) => {
            const target = e.currentTarget.children[1].firstElementChild;
            target.style.strokeDashoffset = "0";
            const styles = getComputedStyle(target);
            this.deleteId = setInterval(() => {
                if (parseInt(styles.strokeDashoffset) === 0) {
                    this.deleteCard();
                    clearInterval(this.deleteId);
                }
            }, 100)

        })

        this.iconBoxs[0].addEventListener("mouseup", (e) => {
            const target = e.currentTarget.children[1].firstElementChild;
            // 这能得出动态变化的属性值
            const styles = getComputedStyle(target);
            
            if (parseInt(styles.strokeDashoffset) > 0) {
                target.style.strokeDashoffset = "88";
                clearInterval(this.deleteId);
            }

        })
    }

    deleteCard() {
        // 这些只是为了删除的过渡效果设置的
        this.card.style.width = "0px";
        this.card.style.paddingLeft = "0px";
        this.card.style.paddingRight = "0px";
        this.card.style.marginRight = "0px";
        this.card.style.opacity = 0;
        // 这才是真正的删除
        // 动画完成后的清理
        setTimeout(() => {
            this.card.remove();
            this.updateNum();
        }, 500)
    }

    edit() {
        this.iconBoxs[2].addEventListener("click", () => {
            this.editBlock.focus();
        })
    }

    updateNum() {
        this.num.innerText = this.cardContainer.children.length;
    }

    // 那个动画是1.5s，所以等1600ms
    finish() {
        this.doneIconBox.addEventListener("click", (e) => {
            this.cardText = this.editBlock.innerText;
            this.card.classList.add("todo-card-done-ani");
            // 这才是真正的删除
            // 动画完成后的清理
            setTimeout(() => {
                this.card.remove();
                this.updateNum();
            }, 1600)

            setTimeout(() => {
                new DoneCard(doneCard, this.colorIndex, this.cardText);
                // this.card.classList.remove("todo-card-done-ani");
            }, 1500)

        })
    }

}

const card1 = new ToDoCard(todoCard, 0, "谢谢", true);
const card2 = new ToDoCard(todoCard, 2, "你好", true);
const card3 = new ToDoCard(todoCard, 1, "再见", true);


class DoneCard {
    constructor(card, colorIndex, cardText, isCreated) {
        this.card = card.cloneNode(true);
        this.clickCount = 0;
        this.clickTimeId = 0;
        this.cardColors = ["orange", "qing", "green", "yellow", "purple"];
        this.colorIndex = colorIndex !== null ? colorIndex: null;
        this.cardText = cardText !== null ? cardText: null;
        this.stateCard = {
            isFav: false,
        }
        this.isCreated = isCreated;

        this.cardTextBlock = this.card.querySelector(".card-text")
        this.cardContainer = document.querySelector(".done-card-container");
        this.iconBoxs = [...this.card.querySelectorAll(".icon-box")];
        this.deleteId = 0;
        this.num = document.querySelector(".done-num");
        this.init();
    }

    init() {
        this.appendCard();

        this.card.classList.remove("card-orange");
        this.card.classList.add("card-" + this.cardColors[this.colorIndex]);
        this.cardTextBlock.innerText = this.cardText;

        this.card.addEventListener("mouseenter", (e) => {
            this.iconBoxs.forEach((item) => {
                item.classList.remove("icon-box-init");
            })
        })

        this.card.addEventListener("mouseleave", (e) => {
            this.iconBoxs.forEach((item) => {
                item.classList.add("icon-box-init");
            })
        })

        this.delete();
        this.backToDo();
    }

    appendCard() {
        this.cardContainer.appendChild(this.card);
        this.updateNum();
        setTimeout(() => {
            this.card.classList.remove("done-card-init");
        }, 50)
    }

    delete() {
        this.iconBoxs[0].addEventListener("mousedown", (e) => {
            const target = e.currentTarget.children[1].firstElementChild;
            const style = getComputedStyle(target);
            target.style.strokeDashoffset = "0";

            this.deleteId = setInterval(() => {
                if (parseInt(style.strokeDashoffset) === 0) {
                    this.deleteCard();
                    clearInterval(this.deleteId);
                }
            })

        })

        this.iconBoxs[0].addEventListener("mouseup", (e) => {
            const target = e.currentTarget.children[1].firstElementChild;
            const style = getComputedStyle(target);
            if (parseInt(style.strokeDashoffset) > 0) {
                target.style.strokeDashoffset = "88";
                clearInterval(this.deleteId);
            }
        })
    }

    deleteCard() {
        // 这些只是为了删除的过渡效果设置的
        this.card.style.width = "0px";
        this.card.style.paddingLeft = "0px";
        this.card.style.paddingRight = "0px";
        this.card.style.marginRight = "0px";
        this.card.style.opacity = 0;
        // 这才是真正的删除
        setTimeout(() => {
            this.card.remove();
            this.updateNum();
        }, 500)
    }

    updateNum() {
        this.num.innerText = this.cardContainer.children.length;
    }

    backToDo() {
        this.iconBoxs[1].addEventListener("click", (e) => {
            this.card.classList.add("done-card-init");
            new ToDoCard(todoCard, this.colorIndex, this.cardText, false);
            // 延迟DOM更新：在将新卡片 this.card 添加到 this.cardContainer 后，
            // 使用 setTimeout 来延迟一些视觉效果的更新。这可以确保DOM更新已经完成，然后才应用额外的类或动画。
            setTimeout(() => {
                this.card.remove();
                this.updateNum();
            }, 300);


        })
    }

}
