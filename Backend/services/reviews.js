const { stripeSecretKey } = require("../config")
const ReviewsModel = require("../models/product")
const stripe = require("stripe")(stripeSecretKey)

// Consultar en la documentación los metodos para crear clientes(customers) y productos(products)

//debemos hacerlo en formato try catch
class Reviews{
    async getAll(limit=20,page=1){
        const total = await ProductModel.count()
        const totalPages = Math.ceil(total / limit)
        if(page>totalPages || page<1){
            return {
                success:false,
                message:"Page not found"
            }
        }

        const skip = (page-1)*limit

        const products = await ReviewsModel.find().skip(skip).limit(limit)

        const nextPage = page===totalPages ? null: limit===20?`/api/products?page=${page+1}`:`/api/products?page=${page+1}&limit=${limit}`
        const prevPage = page===1 ? null : limit===20?`/api/products?page=${page-1}`:`/api/products?page=${page-1}&limit=${limit}`

        return {
            success:true,
            data:products,
            total,
            page,
            prevPage,
            nextPage,
            totalPages
        }
        
    }

    async create(data){
        console.log(data)
        console.log(data.category)
        
        
        const product = await ReviewsModel.create(data)

        return product
    }

    // async getProductByCategory(categories){
    //     try {
           
    //         //  categories.category = this.toLowerCaseList(categories.category)
    //         const product = await ProductModel.find({
    //             category: {
    //                 $all: categories.category
    //             }
    //         })
    //         if (product[0]) {
    //             return product
    //         }
    //         return {
    //             message: "There are no products for those categories"
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async getProductByOwner(owner){
        console.log(owner.owner)
        try {
            
            const product = await ReviewsModel.find({
                owner: {
                    $all: owner.owner
                }
            })
            if (product[0]){
                return product
            }
            return {
                error: true,
                message: "No products for this publisher"
            }
        } catch (error) {
            console.log(error);
        }
    
    }
  

    
    async search(queryFilters, limit=20, page=1) {
        let { brand, priceLessThan, priceHigherThan, category, name, offer } = queryFilters;
        [brand, priceLessThan, priceHigherThan, category, name, offer] = [brand?.trim(), priceLessThan?.trim(), priceHigherThan?.trim(), category?.trim(), name?.trim(), offer?.trim()];
        const total = await ReviewsModel.count()
        const totalPages = Math.ceil(total / limit)
    
        let queryBody = {};
        if(category) {
            queryBody = {
                ...queryBody,
                category: {
                    $elemMatch:{$regex: `.*${category}.*`, $options: "i"}
                }
            }
        }
        if(name) {
          queryBody = {
            ...queryBody,
                 $or: [
                                 {name:{$regex: `.*${name}.*`, $options: "i"}},
                                 {keyword:{$regex:`.*${name}.*`, $options: "i"}} 
                     ]
          };
        }
        if(priceLessThan) {
            queryBody = {
                ...queryBody,
                price: { $lte: priceLessThan }
            }
        }
        if(priceHigherThan) {
            queryBody = {
                ...queryBody,
                price: { $gte: priceHigherThan }
            }
        }
        if(brand) {
            queryBody = {
              ...queryBody,
              brand: { $regex: `.*${brand}.*`, $options: "i" }
            };
          }
        // if(offer) {
        //   queryBody = {
        //     ...queryBody,
        //     offer: this.parseBoolean(offer)
        //   };
        // }
        if(page>totalPages || page<1){
            return {
                success:false,
                message:"Page not found"
            }
        }

        const skip = (page-1)*limit

        const products = await ProductModel.find(queryBody).skip(skip).limit(limit)
        
        const nextPage = page===totalPages ? null: limit===20?`/api/products?page=${page+1}`:`/api/products?page=${page+1}&limit=${limit}`
        const prevPage = page===1 ? null : limit===20?`/api/products?page=${page-1}`:`/api/products?page=${page-1}&limit=${limit}`
        
        return {
            success:true,
            data:products,
            total,
            page,
            prevPage,
            nextPage,
            totalPages
        }
      }
    
    //   parseBoolean(value) {
    //     return (value === "1" || value === "true")? true : false;
    //   }

}


module.exports = Reviews 