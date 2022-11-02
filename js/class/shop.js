import { url_shopCategory, url_basicPurchase, url_playerInfos } from "../../config/url.config.js"

export class Shop {
    constructor() {
        this.recoverDataPlayer()

        this.purchaseWithBasicCoin()
    }

    maDouceEtMagnifiqueFonction() {
        $('#panel').on('mouseenter', () => {
            $('#panel button').on('click', (event) => {
                $('#item').fadeOut(0)
                $('#item').fadeIn(1000)
                $('#panel button').removeClass('vibrate')
                $(event.target).addClass('vibrate')
                $('#image').css('background-image', event.target.style.backgroundImage)
                $('#item h1').html(event.target.name)
                $('#item p').html(event.target.title)
                $('#item h2').html($(event.target).attr("data-price"))
                $('#item').attr('class', event.target.value)
            });
        });
    }

    recoverData(section) {
        $.ajax({
            type: "POST",
            url: url_shopCategory,
            data: { category: section },
            dataType: "json",
            success: function (allItems) {
                allItems.forEach(item => {
                    this.addItems(item.imgUrl, item.product, item.description, item.basicPrice, item.id, section)
                })
            }.bind(this)
        })

    }

    showShop() {
        const section = ['gold', 'skin', 'icon', 'emot', 'bonus']
        section.forEach(element => {
            this.recoverData(element)
        })
        this.maDouceEtMagnifiqueFonction()
    }

    addItems(imgLink, name, description, price, productId, section) {
        $(`#${section}`).append(`
            <button 
                name="${name}"
                style="background-image:url('${imgLink}');"
                title="${description}"
                value="${productId}"
                data-price="${price}"
                >
            </button>`)
    }

    purchaseWithBasicCoin() {
        $(`#purchase`).on("click", () => {
            const btnVal = $("#item").attr('class')
            if (btnVal >= 3 && btnVal <= 5) {
                this.recoverDataPlayer()
                $.ajax({
                    type: "POST",
                    url: url_basicPurchase,
                    data: {
                        pseudo: localStorage.getItem("pseudo"),
                        password: localStorage.getItem("password"),
                        productId: btnVal
                    },
                    dataType: "json",
                })
            }
        })
    }

    recoverDataPlayer() {
        $.ajax({
            type: "POST",
            url: url_playerInfos,
            data: {
                pseudo: localStorage.getItem("pseudo"),
                password: localStorage.getItem("password"),
            },
            dataType: "json",
            success: function (response) {
                $(`#purchase`).html(`${this.convert(response.basicCoin)}`)
            }.bind(this)
        })
    }

    convert(number) {
        let hundred = number % 10 ** 3
        let thousand = Math.round((number - hundred) / 10 ** 3) % 10 ** 3
        let million = Math.round((number - (thousand + hundred)) / 10 ** 6) % 10 ** 3
        let billion = Math.round((number - (million + thousand + hundred)) / 10 ** 9) % 10 ** 3
        if (number > 999 && number < 999999) {
            return `${thousand} K ${hundred}`
        }
        else if (number > 999999 && number < 999999999) {
            return `${million} M ${thousand} K ${hundred}`
        }
        else if (number > 999999999) {
            return `${billion} B ${million} M ${thousand} K ${hundred}`
        }
        else {
            return `${hundred}`
        }
    }
}

