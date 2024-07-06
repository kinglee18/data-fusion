'use server'
import {z} from "zod";
import {redirect} from "next/navigation";
import axiosInterceptorInstance from "@/axiosInterceptorInstance";
import axios from "axios";



export type Product = {
    id: number,
    title: string,
    price: string,
    category: number,
    extra_data: {
        image: string,
        price: number,
        title: string,
        catalog: string,
        discount: number,
        features: string,
        quantity: number,
        category_id: number,
        description: string,
        final_price: number
    }
}



export type GenericResponse<T> = {
    "next_page": number | null,
    "pre_page": number | null,
    "total_pages": number,
    "count": number,
    "status": {
        "code": number,
        "msg": string
    },
    "message": string,
    "data": T[]
}
export const getCatalog: () => Promise<GenericResponse<Product>>  = async () => {
    try {
        const response = await axiosInterceptorInstance.get('/product/get')
        return response.data;
    } catch (e) {
        console.log(e)
        return { message: 'failed to get product' }
    }
}


interface ProductData {
    "title": string,
    "price": number,
    "quantity": number,
    "description": string,
    "category_id": number
}

export const  saveProduct = async (
    prevState: string | undefined,
    formData: FormData
) => {

    const schema = z.object({
        title: z.string().min(3),
        description: z.string().min(3)
    });


    const parse = schema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price")
    });

    if (!parse.success) {
        return { message: parse.error.errors[0].message };
    }
    try {
        const postData : ProductData = {
            title: formData.get("title") as string,
            price: Number(formData.get("price")),
            quantity: 100,
            description: formData.get("description") as string,
            category_id: 1
        }
        const response = await axiosInterceptorInstance.post('/product/create', {products: [postData]})
        return response.data
    } catch (e) {
        console.log(e)
        return { message: 'failed to create product' }
    }
    redirect('/home/catalog')

}

export const getCustomers = async () => {
    // mock data based in this keys checkbox ,given_name ,family_name ,email ,birth_date ,created_at ,address ,locality ,postal_code
    return [
        { id: 1, given_name: 'John', family_name: 'Doe', email: 'Jhon@gmail.com', birth_date: '1990-01-01', created_at: '2021-01-01', address: '1234 Main St', locality: 'San Francisco', postal_code: '94111' },
        { id: 2, given_name: 'Jane', family_name: 'Doe', email: 'Jane@gmail.com', birth_date: '1990-01-01', created_at: '2021-01-01', address: '1234 Main St', locality: 'San Francisco', postal_code: '94111' },
        { id: 3, given_name: 'Alice', family_name: 'Doe', email: 'Alice@gmail.com', birth_date: '1990-01-01', created_at: '2021-01-01', address: '1234 Main St', locality: 'San Francisco', postal_code: '94111' }
    ];

}
