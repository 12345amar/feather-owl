import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { json } from 'react-router-dom';

 
export async function POST(request) {
    try {
        const headersList = headers()
        const authToken = headersList.get('Authorization')
        const body = await request.json();
        console.log("=== const json = await request.json();", body.operation)
        const url = `http://k8s.integration.feather-lab.com:32744${body.operation}`
        
        let requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${authToken}`
            },
            redirect: "follow",
        }
        if (body?.method) {
            requestOptions = {...requestOptions, method: "POST", body: json.Stringify(body)}
        } 
        console.log("==requestOptions", url, requestOptions)
        const res = await fetch(url, requestOptions);
        
        const data = await res.json();
        console.log("=========res", data)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
    
}