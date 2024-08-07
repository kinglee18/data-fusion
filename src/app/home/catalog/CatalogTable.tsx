import Table from "@/components/Table";
import React from "react";
//import suspense
import {Suspense} from "react";
import axios from "axios";
import {getCatalog, GenericResponse, Product} from "@/services/catalog";
import Loader from "@/components/loader";
import UpdateDialog from "@/app/home/catalog/updateDialog";

export default async function CatalogTable({action}: any) {
    const catalog: GenericResponse<Product>  = await getCatalog()
    const data = catalog.data.map((item) => {
        return {
            checkbox: <input type="checkbox"/>,
            ...item,
            //tools: <UpdateDialog product={item}/>
        }
    })
    console.log(catalog)
    return (
        <Table
            columns={[
                {title: '', key: 'checkbox', width: 'w-[50p]'},
                {title: 'Name', key: 'title', width: 'w-[50p]'},
                {title: 'Price', key: 'price', width: 'w-[25p]'},
                {title: 'Description', key: 'category', width: 'w-[25p]'},
                {title: '', key: 'tools', width: 'w-[25p]'},
            ]}
            data={data}
        />)
}
