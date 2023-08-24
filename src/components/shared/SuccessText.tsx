import React from 'react'

export function SuccessText(props: any) {
    return (
        <div className="p-3 my-2 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            <span className="font-medium">Success: </span> {props.success}
        </div>
    )
}


export function ErrorText(props: any) {
    return (
        <div className="p-3 my-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">Warning!</span> {props.error}
        </div>
    )
}