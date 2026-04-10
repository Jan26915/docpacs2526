const fs = require('fs')
const orders = [];

const data = fs.readFileSync('data.csv', 'utf-8')

let rows = data.split('\n')

for (row of rows){
    let columns = row.split(' ,')
    if (orders.length == 0 || orders[orders.length-1].name !== columns[0] ){
        orders.push({
            name : columns[0],
            address : columns[1],
            item : []
        })
    }
    orders[orders.length-1].item.push({
        item : columns[2],
        QTY : Number(columns[3]),
        price : Number(columns[4])
    })
}

for (order of orders){
    order.subtotal = 0
    order.salesTax = 0
    order.shipping = 0
    order.grandTotal = 0

    console.log(`Name\t${order.name}`)
    console.log(`Address\t${order.address}`)
    console.log(`QTY\tPrice\t\tTotal\t\tItem`)
    for (item of order.item) {
        console.log(`${item.QTY}\t${item.price}\t\t${item.price * item.QTY}\t\t${item.item}`)
        order.subtotal += item.price * item.QTY
    }
    order.salesTax = order.subtotal * 0.06
    console.log(`\tSubtotal\t${order.subtotal}`)
    console.log(`\tSales Tax\t${order.salesTax.toFixed(2)}`)

    if (order.subtotal < 50){
        order.shipping = 10.00
    }

    console.log(`\tShipping\t${order.shipping.toFixed(2)}`)
    
    order.grandTotal = Number(order.subtotal) + Number(order.salesTax) + Number(order.shipping)

    console.log(`\tGrand Total\t${order.grandTotal.toFixed(2)}`)

}