import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import ProductMain1 from "../../assets/image/ProductItemImg.png";
import ProductDetailImg from "../../assets/image/ProductDetail.png";
import ReviewItem from "../review/ReviewItem.jsx";
import ProductSidebar from "./ProductSidebar.jsx";
import ProductSize from "./ProductSize.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dummyProducts = {
    1: {
      name: "Cotton Bag",
      price: 29900,
      description: "상세 정보",
      mainImg: ProductMain1,
      detailImg: ProductDetailImg,
    },
    2: {
      name: "린넨 셔츠",
      price: 39900,
      description: "상세 정보",
      mainImg: ProductMain1,
      detailImg: ProductDetailImg,
    },
  };

  const product = dummyProducts[id];
  if (!product) return <div className="text-center py-20">상품을 찾을 수 없습니다 😢</div>;

  const images = [product.mainImg, product.detailImg];

  const dummyInquiries = [
    {
      id: 1,
      title: "사이즈 교환 가능한가요?",
      content: "M 사이즈로 교환하고 싶은데 가능할까요?",
      answer: "네, 상품 수령 후 7일 이내 교환 가능합니다.",
    },
    {
      id: 2,
      title: "배송 기간이 얼마나 걸리나요?",
      content: "서울 기준으로 며칠 걸리는지 궁금합니다.",
      answer: "평균 2~3일 정도 소요됩니다.",
    },
    {
      id: 3,
      title: "세탁 방법 문의",
      content: "세탁기 사용 가능한가요?",
      answer: "세탁기보다는 손세탁 또는 드라이클리닝을 권장합니다.",
    },
  ];

  const reviews = [
    {
      username: "사용자1",
      date: "25.06.13",
      rating: 5,
      option: "M",
      height: "170cm",
      weight: "71kg",
      body: "핏이 예쁘고 재질이 좋아요! 배송도 빨랐습니다.",
      images: [product.detailImg],
    },
    {
      username: "사용자2",
      date: "25.06.12",
      rating: 4,
      option: "L",
      height: "165cm",
      weight: "60kg",
      body: "사진보다 실제 색상이 더 예뻐요!",
      images: [product.detailImg],
    },
  ];

  const tabList = ["info", "size", "review", "inquiry"];

  const handlePrevImg = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-16 font-sans">
      <div className="grid md:grid-cols-[3fr_2fr] gap-12">
        {/* 왼쪽 */}
        <div>
          <div className="relative flex justify-center">
            <img
              src={images[selectedIndex]}
              alt="Product"
              className="w-full max-w-lg rounded-2xl shadow-md object-cover"
            />
            <button
              onClick={handlePrevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setSelectedIndex(i)}
                className={`w-20 h-20 rounded-xl cursor-pointer object-cover border-2 transition ${
                  selectedIndex === i
                    ? "border-gray-900 scale-105"
                    : "border-transparent hover:border-gray-400"
                }`}
              />
            ))}
          </div>

          {/* 탭 */}
          <div className="mt-12 relative">
            <div className="flex border-b border-gray-300 text-sm font-semibold font-pretendard relative">
              {tabList.map((tab) => (
                <button
                  key={tab}
                  className="flex-1 py-3 text-center relative z-10"
                  onClick={() => setActiveTab(tab)}
                >
                  <span className={`${activeTab === tab ? "text-gray-900" : "text-gray-500"}`}>
                    {tab === "info"
                      ? "정보"
                      : tab === "size"
                      ? "사이즈"
                      : tab === "review"
                      ? "리뷰"
                      : "문의"}
                  </span>
                </button>
              ))}

              {/* 밑줄 */}
              <div
                className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
                style={{
                  width: `${100 / tabList.length}%`,
                  transform: `translateX(${tabList.indexOf(activeTab) * 100}%)`,
                }}
              />
            </div>

            <div className="bg-white rounded-b-2xl shadow-sm mt-2">
              {(() => {
                switch (activeTab) {
                  case "info":
                    return (
                      <div className="p-6 text-gray-700 leading-relaxed font-pretendard">
                        <p className="font-semibold">{product.description}</p>
                        {product.detailImg && (
                          <img
                            src={product.detailImg}
                            alt="상품 상세 이미지"
                            className="w-full mt-6 rounded-2xl object-cover ml-10"
                          />
                        )}
                      </div>
                    );
                  case "size":
                    return <ProductSize />;
                  case "review":
                    return (
                      <div className="p-6 space-y-6">
                        {reviews.map((review, idx) => (
                          <ReviewItem key={idx} review={review} />
                        ))}
                      </div>
                    );
                  case "inquiry":
                    return <InquiryTab inquiries={dummyInquiries} />;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>

        {/* 오른쪽 결제 영역 */}
        <ProductSidebar product={product} />
      </div>
    </div>
  );
}

// 문의 탭 컴포넌트
function InquiryTab({ inquiries }) {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6 font-pretendard">
      <h3 className="font-semibold font-pretendard mb-2">문의하기</h3>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-2 mt-2 text-sm"
        rows={3}
        placeholder="문의 내용을 입력하세요..."
      />
      <button className="mt-3 px-2 py-2 bg-black text-xs text-white rounded-lg hover:bg-gray-700">
        문의 제출
      </button>

      <div className="mt-6">
        <h4 className="font-semibold font-pretendard mb-2">전체 문의</h4>
        <ul className="space-y-2 text-xs">
          {inquiries.map((inq) => (
            <li key={inq.id} className="border rounded-lg">
              <button
                className="flex justify-between items-center w-full px-3 py-2 text-left"
                onClick={() => toggleOpen(inq.id)}
              >
                <span>{inq.title}</span>
                {openId === inq.id ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openId === inq.id && (
                <div className="px-3 py-4 border-t text-gray-700 space-y-3">
                  <p>{inq.content}</p>
                  <p className="bg-gray-100 p-4 rounded text-gray-600">
                    판매자 답변 <br /> {inq.answer}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
