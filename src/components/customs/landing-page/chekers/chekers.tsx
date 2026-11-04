export default function Checkers() {
    return (
        <div
            aria-hidden="true"
            className="relative h-5 w-full bg-[conic-gradient(#f7f6f2_25%,#0a0a0a_0_50%,#f7f6f2_0_75%,#0a0a0a_0)] bg-[length:20px_20px]"
        >
            <span className="absolute top-0 left-[round(down,22%,10px)] size-2.5 bg-[#ff4a1c]" />
            <span className="absolute top-0 left-[round(down,80%,10px)] size-2.5 bg-[#ff4a1c]" />
            <span className="absolute top-2.5 left-[round(down,51%,10px)] size-2.5 bg-[#ff4a1c]" />
        </div>
    );
}