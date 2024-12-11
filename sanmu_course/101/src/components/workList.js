export default class WorkList {
    // 静态方法

    static createList = null;
    static init(data) {
        if (!(this.createList instanceof WorkList)) {
            this.createList = new WorkList(data);
            this.createList.listInit();
        }
    }

    constructor(data) {
        this.listData = data;
        this.targetElement = document.querySelector(".works-box");
    }

    listInit() {
        this.listData.forEach((item) => {
            const html = this.createWorkDom(item);
            this.append(html);
        })
    }

    // 原型方法
    createWorkDom(workData) {
        const htmlText = `
            <div class="works-item">
                    <div class="text-box">
                        <a class="item-text" href="${workData.htmlUrl}">
                              ${workData.title}
                        </a>
                        <div class="move-text">
                            ${workData.subTitle}
                        </div>
                    </div>
                    
                    <div class="move-img">
                        <img src="${workData.imgUrl}" alt="">
                    </div>
            </div>
        
        `
        return htmlText;
    }

    append(html) {
        this.targetElement.insertAdjacentHTML("beforeend", html)
    }

    

    
}