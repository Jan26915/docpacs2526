const fs = require('fs')
const orders = []

data = fs.readFileSync('data.csv','utf-8')

rows = data.split('\n')

for(row of rows){
    column = row.split(',')

    if(orders.length == 0 || orders[orders.length - 1].name !== column[0]) {
        orders.push({
            name : column[0],
            address : column[1],
            item : []
        })
    }

    orders[orders.length-1].item.push({
        item : column[2],
        QTY : Number(column[3]),
        price : Number(column[4])
    })
}

for (order of orders) {
    order.subtotal = 0
    order.salesTax = 0
    order.shipping = 0
    order.grandTotal = 0

    console.log(`Name\t${order.name}`)
    console.log(`Address\t${order.address}`)
    console.log(`QTY\tPrice\t\t\tTotal\tItem`)

    for(item of order.item){
        console.log(`${item.QTY}\t${item.price}\t\t\t${item.QTY * item.price}\t${item.item}`)
        order.subtotal += item.QTY * item.price
    }

    order.salesTax = order.subtotal * 0.06

    if (order.subtotal < 50){
        order.shipping = 10.00
    }

    console.log(`\tSubtotal\t\t${order.subtotal}`)
    console.log(`\tSales Tax\t\t${order.salesTax.toFixed(2)}`)
    console.log(`\tShipping\t\t${order.shipping.toFixed(2)}`)

    order.grandTotal = order.subtotal + Number(order.salesTax) + Number(order.shipping)
    console.log(`\tGrand Total\t\t${order.grandTotal.toFixed(2)}`)
}