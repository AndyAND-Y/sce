import Container from "../Container";
import ThemeButton from "../ThemeButton";


export default function Navbar() {

    return (
        <div className="w-full p-4">
            <Container>
                <div className="flex justify-between p-1">
                    <h1 className="text-2xl p-2 font-semibold">Secure Crypto Exchange</h1>
                    <ThemeButton />
                </div>
            </Container>
        </div>
    )

}