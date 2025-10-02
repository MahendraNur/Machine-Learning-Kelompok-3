import { Link } from "react-router-dom"

export default function Home(){

    return(
        <>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <p>Orang Keren</p>
        </body>
        </html>
            <Link to="/prediction">balik</Link>
        </>
    )
}
