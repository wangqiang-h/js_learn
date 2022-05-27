## $unwind

> 展开一个列表，1个文档生成多个文档

```
2种用法：
{ $unwind : "$sizes" } 
{
  $unwind:
    {
      path: <field path>,
      includeArrayIndex: <string>,   // 同时生成索引
      preserveNullAndEmptyArrays: <boolean>
    }
}


preserveNullAndEmptyArrays： 
If true, if the path is null, missing, or an empty array, $unwind outputs the document.
If false, if path is null, missing, or an empty array, $unwind does not output a document.
The default value is false.
```

## $group

> 100M的内存限制，可以增加参数 allowDiskUse <br>
> $group 的$_id 可以是一个文档

```
db.sales.aggregate([
  {
    $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
  },
  {
    $group : {
       _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
       count: { $sum: 1 }
    }
  },
  {
    $sort : { totalSaleAmount: -1 }
  }
 ])
```

```
group use $addToSet

Returns an array of unique expression values for each group. Order of the array elements is undefined.

db.sales.aggregate(
   [
     {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           itemsSold: { $addToSet: "$item" }
         }
     }
   ]
)
```

```
agg  push

db.sales.aggregate(
   [
   { $sort: { date: 1, item: 1 } },
   {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }
         }
     }
   ]
)
```

## $lookup

> from 可以是一个字段，也可以是一个数组

```
db.orders.aggregate( [
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
] )

db.orders.aggregate( [
   {
      $lookup: {
         from: "items",
         localField: "item",    
         foreignField: "item", 
         as: "fromItems"
      }
   },
   {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { fromItems: 0 } }
] )
```

## $concat

```
If the argument resolves to a value of null or refers to a field that is missing, $concat returns null.

[
    {
        '$project': {
            'new_name': {
                '$concat': [
                    '$name', ':', '$restaurant_id'
                ]
            }
        }
    }
]
```

## $ifNull

> $ifNull 找到第一个不为null的值 <br>
> $ifNull treats undefined values and missing fields as null.

```
   [
      {
         $project: {
            item: 1,
            value: { $ifNull: [ "$description", "$quantity", "Unspecified" ] }
         }
      }
   ]

```