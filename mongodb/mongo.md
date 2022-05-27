## $each

> use with `$addToSet` and `$push`

- $addToSet: Use with the $addToSet operator to add multiple values to an array <field> if the values do not exist in the <field>.
- $push: Use with the $push operator to append multiple values to an array <field>.

```
db.students.updateOne({name: "joe", 
                      {$push: {scores: {$each: [1,2,3]}}}})

```

## $first $last $arrayElemAt

```
db.users.aggregate([{$project: {
                                name: 1,
                                first: {$arrayElemAt: ["$favorites", 0]},
                                last: {$arrayElemAt: ["$favorites", -1]}
}}])
```

## $mergeObjects

> 相同的字段，后面的文档覆盖之前的文档

```
db.orders.aggregate( [
   {
      $lookup: {
         from: "items",
         localField: "item",    // field in the orders collection
         foreignField: "item",  // field in the items collection
         as: "fromItems"
      }
   },
   {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { fromItems: 0 } }
] )

> $mergeObjects as an Accumulator
db.sales.aggregate( [
   { $group: { _id: "$item", mergedSales: { $mergeObjects: "$quantity" } } }
] )
```


## $pull $pullAll

>The $pull operator removes from an existing array all instances of a value or values that match a specified condition.

>

```
pull remove 一个值 或者 是个条件
db.stores.updateMany(
    { },
    { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }
)

db.profiles.updateOne( { _id: 1 }, { $pull: { votes: { $gte: 6 } } } )

pullAll 多个值
db.survey.updateOne( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )
```