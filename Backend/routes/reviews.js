const express = require("express")
const ReviewsService = require("../services/reviews")
const authMiddleware = require("../middleware/auth")

function reviews(app){
    const router = express.Router()
    const reviewsServ = new ReviewsService()

    app.use("/api/reviews",router)

    router.get("/",async (req,res)=>{
        const limit = isNaN(parseInt(req.query.limit)) ? undefined: parseInt(req.query.limit)
        const page = isNaN(parseInt(req.query.page)) ? undefined: parseInt(req.query.page)
        const result = await reviewsServ.getAllReviews(limit,page)

        return res.json(result)
    })

    router.post("/",authMiddleware(1),async (req,res)=>{
        const result = await reviewsServ.create({
            ...req.body,
            owner:req.user.id
        })

        return res.json(result)
    })


    router.post("/owner", async (req, res) => {
        const product = await reviewsServ.getProductByOwner(req.body)
        return res.json(product)
    })
    
    router.get("/filter", async (req, res) => {
        const limit = isNaN(parseInt(req.query.limit)) ? undefined: parseInt(req.query.limit)
        const page = isNaN(parseInt(req.query.page)) ? undefined: parseInt(req.query.page)
        const result = await reviewsServ.search(req.query, limit, page);
        return res.json(result);
      });


}


module.exports = reviews 