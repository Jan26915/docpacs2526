const fs = require('fs')
const orders = []

data = fs.readFileSync('data.csv', 'utf-8')

let row = data.split('\n')
for (rows of row){
    let column = rows.split(',')
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
    console.log(`QTY\tPrice\t\tTotal\tItem`)

    for (item of order.item) {
        console.log(`${item.QTY}\t${item.price}\t\t${item.price * item.QTY}\t${item.item}`)
        order.subtotal += item.QTY * item.price
    }

    order.salesTax = order.subtotal * 0.06
    order.salesTax = order.salesTax.toFixed(2)
    
    if (order.subtotal < 50){
        order.shipping = 10.00
    }

    order.grandTotal = order.shipping + order.subtotal + Number(order.salesTax)

    console.log(`\tSubtotal\t${order.subtotal.toFixed(2)}`)
    console.log(`\tSales Tax\t${order.salesTax}`)
    console.log(`\tShipping\t${order.shipping.toFixed(2)}`)
    console.log(`\tGrand Total\t${order.grandTotal.toFixed(2)}`)
}
