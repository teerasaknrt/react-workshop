// name action
export const ADD_CART = 'ADD-CART';

// funtion คำนวนต่างๆ
export const addToCart = (menu = {}, cart = []) => {

    let exist = false;

    if (cart.length > 0) {
        for (const c of cart) {
            if (c.id === menu.id) {
                c.qty++;
                exist = true
            }
        }
    }

    if (!exist) {
        // เป็นการ push menu ใส่ใน cart
        cart.push(menu)
    }

    // ใช้ reduce ในการบวกทบ โดยค่าเริ่มต้องของการบวกเป็น 0
    const total = cart.reduce((total, value) => total + value.qty, 0)


    // return ไปให้ reducer
    return {
        type: ADD_CART,
        payload: {
            cart: cart,
            total: total
        }
    }
}