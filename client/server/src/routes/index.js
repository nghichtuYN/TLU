const UserRouter=require('./UserRouter')
const AuthorRouter=require('./AuthorRouter')
const CategoryRouter=require('./CategoryRouter')
const BookRouter=require('./BookRouter')
const OrderRouter=require('./OrderRouter')
const StudentRouter=require('./StudentRouter')
const routes = (app)=>{
    app.use('/api/user',UserRouter)
    app.use('/api/author',AuthorRouter)
    app.use('/api/category',CategoryRouter)
    app.use('/api/book',BookRouter)
    app.use('/api/order',OrderRouter)
    app.use('/api/student',StudentRouter)
}       

module.exports = routes;
