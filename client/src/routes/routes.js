import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";
import DetailUserPage from "../pages/DetailUserPage/DetailUserPage";
import HomePage from "../pages/HomePage/HomePage";
import HomePageStudent from "../pages/HomePageStudent/HomePageStudent";
import ManageAuthorPage from "../pages/ManageAuthorPage/ManageAuthorPage";
import ManageBookPage from "../pages/ManageBookPage/ManageBookPage";
import ManageCategory from "../pages/ManageCategory/ManageCategory";
import ManageMember from "../pages/ManageMember/ManageMember";
import ManageOrderPage from "../pages/ManageOrderPage/ManageOrderPage";
import ManageStudentPage from "../pages/ManageStudentPage/ManageStudentPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeCategoryPage from "../pages/TypeCategoryPage/TypeCategoryPage";

export const publicRoute=[
    {path:'/home',component:HomePage,isShowHeader:true},
    {path:'/',component:SignInPage,noHeader:true},
    {path:'/sign-up',component:SignUpPage},
    {path:'/profile',component:HomePage,isShowHeader:true},
    {path:'/manage-book',component:ManageBookPage,isShowHeader:true},
    {path:'/manage-author',component:ManageAuthorPage,isShowHeader:true},
    {path:'/manage-student',component:ManageStudentPage,isShowHeader:true},
    {path:`/manage-category`,component:ManageCategory,isShowHeader:true},
    {path:'/manage-member',component:ManageMember,isShowHeader:true},
    {path:'/manage-order',component:ManageOrderPage,isShowHeader:true},
    {path:'/home-page',component:HomePageStudent,isShowHeader:false},
    {path:'/book-detail/:id',component:BookDetailPage,isShowHeader:false},
    {path:'/category',component:TypeCategoryPage,isShowHeader:false},
    {path:'/detail-user',component:DetailUserPage,isShowHeader:true},

    
]