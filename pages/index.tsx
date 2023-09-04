import { NextPage } from "next";

const IndexPage: NextPage = () => {
    return <div>猫画像予定地</div>
}

export default IndexPage;

type Image = {
    url: string
}
const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images: unknown = await res.json();

    // 配列として表現されているかチェック
    if (!Array.isArray(images)) {
        throw new Error("猫の画像が取得できませんでした")
    }
    
    const image: unknown = images[0]
    // Imageの構造かどうかチェック
    if (!isImage(image)) {
        throw new Error("猫の画像が取得できませんでした")
    }

    return image
}

// 型ガード関数
const isImage = (value: unknown): value is Image => {
    // 値がオブジェクトかチェック
    if (!value || typeof value !== "object") {
        return false;
    }
    // urlプロパティが存在し、かつ、それが文字列なのかチェック
    return "url" in value && typeof value.url == "string";
}
fetchImage()
