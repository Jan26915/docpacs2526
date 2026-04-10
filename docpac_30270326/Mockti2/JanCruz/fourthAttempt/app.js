const fs = require('fs')
const orders = []

data = fs.readFileSync('data.csv', 'utf-8')
rows = data.split('/n')

for (row of rows) {
    column = row.split(',')

    if (orders.length == 0 || orders[orders.length-1].name !== column[0]){
        orders.push({
            name : column[0],
            address : column[1],
            item : []
        })
    }

    orders[orders.length - 1].item.push({
        item : column[2],
        QTY : column[3],
        price : column[4]
    })

    console.log(orders)
}