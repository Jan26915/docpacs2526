const csv = require('csv-parser')
const fs = require('fs')
const orders = [];

fs.createReadStream('data.csv')
 .pipe(csv())
 .on('data', (data) => {
    console.log(data);
    if (orders.length == 0 || orders[orders.length - 1].name !== data.name) {
        orders.push({
            name: data.name,
            address : data.address,
            item: []
        })
    }

    orders[orders.length - 1].item.push({
        item : data.item,
        QTY : data.QTY,
        price : data.price
    })
 })
 .on('end', () => {
    for (order of orders){
        order.subtotal = 0
        order.salesTax = 0
        order.shipping = 0
        order.grandTotal = 0
        console.log(`Name:\t${order.name}`)
        console.log(`Address:\t${order.address}`)
        console.log(`QTY\tPrice\t\tTotal\tItem`)
        for (item of order.item){
            item.total = item.QTY * item.price
            order.subtotal += item.total
            console.log(`${item.QTY}\t${item.price}\t\t${item.total}\t${item.item}`)
        }
        console.log(`\tSubtotal\t${order.subtotal}`)
        order.salesTax = order.subtotal*0.06
        order.salesTax = order.salesTax.toFixed(2)
        order.salesTax = Number(order.salesTax)
        console.log(`\tSales Tax\t${order.salesTax}`)
        if(order.subtotal <= 50) {
            order.shipping = 10.00
            order.shipping = order.shipping.toFixed(2)
            order.shipping = Number(order.shipping)
        }
        order.grandTotal = order.subtotal + order.shipping + order.salesTax
        order.grandTotal = order.grandTotal.toFixed(2)
        order.grandTotal = Number(order.grandTotal)
        console.log(`\tShipping\t${order.shipping.toFixed(2)}`)
        console.log(`\tGrand Total\t${order.grandTotal}`)
    };
 });

