//createSlice
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice=createSlice({
    // name
    //state
    //reducers

    name:"cart",
    initialState:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
        cartTotalQuantity:0,
        cartTotalAmount:0
    },
    reducers:{
        addToCart:(state,action)=>{
            const itemIndex=state.cartItems.findIndex((item)=>item.id===action.payload.id)
            if(itemIndex>=0){
                state.cartItems[itemIndex].cartQuantity +=1;
                state.cartTotalQuantity=state.cartItems.reduce((acc,cv)=>acc+cv.cartQuantity,0)
                toast.info(`increased ${state.cartItems[itemIndex].name} Product Quantity`,{
                    position:"bottom-left"
                })
            }else{
                const tempProduct={...action.payload,cartQuantity:1};
                state.cartItems.push(tempProduct)
                state.cartTotalQuantity=state.cartItems.reduce((acc,cv)=>acc+cv.cartQuantity,0)
                toast.success(`${action.payload.name} added to cart`,{
                position:"bottom-left"
                })
            }  
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))          
        },
        clearCart:(state,action)=>{
            state.cartItems=[];
            state.cartTotalQuantity=0;
            state.cartTotalAmount=0;
            toast.error(` Cart cleared `,{
                position:"bottom-left"
            })
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

        },
        removeFromCart:(state,action)=>{
            const nextCartItems=state.cartItems.filter((element)=>element.id!==action.payload.id);

            state.cartItems=nextCartItems;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} removed from the cart`,{
                position:"bottom-left"
            })

        },
        decreaseCart:(state,action)=>{
            const itemIndex=state.cartItems.findIndex((element)=>element.id==action.payload.id);
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity-=1;
                toast.info(`Decreased ${action.payload.name} cart quantity`,{
                    position:"bottom-left"
                });
            } else if(state.cartItems[itemIndex].cartQuantity==1){
                const nextCartItems=state.cartItems.filter((element)=>element.id!==action.payload.id);

            state.cartItems=nextCartItems;
            
            toast.error(`${action.payload.name} removed from the cart`,{
                position:"bottom-left"
            })

            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        getTotals:(state,action)=>{
            let {total,quantity}=state.cartItems.reduce(
                (acc,cv)=>{
                    const {price,cartQuantity}=cv;
                    const itemTotal=price*cartQuantity;
                    acc.total+=itemTotal;
                    acc.quantity+=cartQuantity;

                    return acc;
                },
                {
                    total:0,
                    quantity:0
                }
            );
            state.cartTotalQuantity=quantity;
            state.cartTotalAmount=total;
        }
        
    }
})
//export
//export actions
export const {addToCart,clearCart,removeFromCart,decreaseCart,getTotals}=cartSlice.actions;

//export reducer
export default cartSlice.reducer