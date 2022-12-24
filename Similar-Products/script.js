(() => {
    const stylesCustom = 
    `.recommenderTitle {
        width: 50%;
        font-size: 25px;
        margin: 34px 0px -50px 122px;
        font-family: revert;
    }
    @media (orientation:portrait) {
        .recommenderTitle {
            width: 100%;
            font-size: 25px;
            margin: 35px 0px -100px 54px;
            font-family: revert;
        }
    }
    .recommenderContainer {
        display: flex;
        width: 90%;
        flex-direction: row;
        margin: 0 auto;
        background: #fff;
        height: 600px;
        transition: all 1s;
    }
    .itemListContainer {
        display: flex;
        align-items: center;
        width: 100%;
        overflow: scroll;
        padding: 0;
        margin: 0;
        gap: 10px;
    }
    .itemListContainer::-webkit-scrollbar {
        display: none;
    }
    .listItem {
        display: flex;
        width: clamp(200px , 19.4% , 100%);
        min-width: clamp(200px, 19.4% ,100%);
        max-width: 100%;
        flex-direction: column;
    }
    .productImageWrapper {
        width: 100%;
        height: 60%;
    }
    .productInfoContainer {
        display: flex;
        height: 40%;
        flex-direction: column;
    }
    .productImageWrapper img {
        width: 100%;
        height: 100%;
    }
    .productTitle {
        font-weight: 500;
        font-size: 15px;
        line-height: 1.5em;
        padding: 1px 0px 1px 12px;
        overflow: hidden;
        height: 3em;
    }
    .arrow {
        font-size: 3.5rem;
        background: transparent;
        border: none;
        outline: none;
        padding: 10px;
        cursor: pointer;
    }
    .arrows {
        display: flex;
        align-items: center;
    }
    .productPrice {
        color: #2424be;
        font-weight: 550;
        font-size: 1.8rem;
        padding: 1px 0px 1px 12px;
    }
    .cardItems {
        align-items: center;
        width: 100%;
        height: 100%;
        border: 1px solid #BEBFDD;
        border-radius: 2px;
        1px 1px 3px #091251
    }
    .urlClass:link {
        text-decoration: none;
    }
    .urlClass:visited {
        text-decoration: none;
    }
    .urlClass:hover {
        text-decoration: none;
    }
    .urlClass:active {
        text-decoration: none;
    }`;

    const getDataFromAPI = async () => {
        const result = await fetch(
            "https://insider-optimus.herokuapp.com/smart-recommender"
        ).then((res) => res.json());

        return result;
    };

    const createListItem = (product) => {

        const el = document.createElement("li");
        el.classList.add("listItem");

        el.innerHTML = 
        `<div class="cardItems">
        <a class="urlClass" href="${product.url}" target="_blank">
            <div class="productImageWrapper">
            <img
                object-fit="contain"
                src="${product.img}"
            />
            </div>
            <div class="productInfoContainer">
                <div class="productTitle">${product.name}</div>
                <div class="productPrice">${product.price ? product.price : "Stokta yok"} TL</div>
            </div>
            </a>
        </div>`;

        return el;
    };
    const createBody = () => {
        const elem = document.createElement("div");
        elem.innerHTML = 
        `<div class="recommenderTitle"> YOU MIGHT ALSO LIKE </div>
        <div class="recommenderContainer">
            <div class="arrows">
                <div class="arrow"  id="left">&#x3c;</div>
            </div>
            <ul class="itemListContainer">
            </ul>
            <div class="arrows">
                <div class="arrow" id="right">&#x3e;</div>
            </div>
        </div>`;

        return elem;
    };

    const start = async () => {
        // $(".recommenderTitle").remove();
        // $(".recommenderContainer").remove();
        const products = await getDataFromAPI();
        const styleSheet = document.createElement("style");
        styleSheet.innerHTML = stylesCustom;
        document.head.appendChild(styleSheet);

        const footerContainer = document.querySelector(
            "#footer__container > div.footer__container"
        );

        const elemBefore = document.querySelector(
            "#footer__container > div.footer__container > div.container.footer-content.d-block"
        );

        const bodySection = createBody();

        footerContainer.insertBefore(bodySection, elemBefore);
        const container = document.querySelector(".itemListContainer");

        products.forEach((product) =>
            container.appendChild(createListItem(product))
        );

        addScroller();
    };

    start();

    const addScroller = () => {
        const rightButton = document.querySelector("#right");
        const leftButton = document.querySelector("#left");
        const list = document.querySelector(".itemListContainer");
        const item = document.querySelector(".listItem");

        leftButton.addEventListener("click", () => {
            if (document.querySelector(".itemListContainer").scrollLeft === 0) {
                var maxScrollWidth = list.scrollWidth;
                list.scrollTo(maxScrollWidth, 0);
            } else {
                const width = (item.offsetWidth + 10);
                list.scrollLeft -= width;
            }
        });

        rightButton.addEventListener("click", () => {
            var maxScrollWidth = list.scrollWidth;
            if (document.querySelector(".itemListContainer").scrollLeft >= item.offsetWidth * 5) {
                list.scrollLeft = 0;
            } else {
                const width = (item.offsetWidth + 10);
                list.scrollLeft += width;
            }
        });
    };
})();
