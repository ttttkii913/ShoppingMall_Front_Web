import { Star } from "lucide-react";

export default function ReviewItem({ review }) {
  const { username, date, rating, option, body, height, weight, images } = review;

  // 보여줄 최대 이미지 수
  const MAX_DISPLAY = 6;
  const extraCount = images.length - MAX_DISPLAY;

  return (
    <div className="border-b border-gray-200 py-4 space-y-2">
      {/* 리뷰 이미지 갤러리 */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-2">
          {images.slice(0, MAX_DISPLAY).map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img}
                alt={`리뷰 이미지 ${idx + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              {/* 마지막 이미지에 더보기 표시 */}
              {idx === MAX_DISPLAY - 1 && extraCount > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold rounded-md">
                  +{extraCount} 더보기
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 사용자 정보 */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{username}</span>
        <span>{date}</span>
      </div>

      {/* 별점 */}
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="text-xs text-gray-500">{rating}</span>
      </div>

      {/* 구매 옵션 / 체형 정보 */}
      <div className="text-xs text-gray-500">
        <span>구매옵션: {option}</span> · <span>체형정보: {height} / {weight}</span>
      </div>

      {/* 리뷰 본문 */}
      <p className="text-sm text-gray-700">{body}</p>
    </div>
  );
}
