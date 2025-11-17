import ProductSizeImg from "../../assets/image/ProductSize.png";

export default function ProductSize() {
  return (
    <div className="p-6 text-gray-700">
      <h3 className="font-semibold font-pretendard mb-3">사이즈 정보</h3>
      <img
        src={ProductSizeImg}
        alt="사이즈 이미지"
        className="w-full max-w-sm rounded-lg mb-4 mx-auto"
      />
      <table className="w-full text-center border border-gray-200 font-pretendard">
        <thead>
          <tr className="bg-gray-200">
            <th className=" px-3 py-1">cm</th>
            <th className="px-3 py-1">총장</th>
            <th className="px-3 py-1">어깨</th>
            <th className="px-3 py-1">가슴</th>
            <th className="px-3 py-1">소매</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 py-1">S</td>
            <td className="px-3 py-1">65</td>
            <td className="px-3 py-1">48</td>
            <td className="px-3 py-1">60</td>
            <td className="px-3 py-1">59</td>
          </tr>
          <tr>
            <td className="px-3 py-1">M</td>
            <td className="px-3 py-1">67</td>
            <td className="px-3 py-1">50</td>
            <td className="px-3 py-1">62</td>
            <td className="px-3 py-1">61</td>
          </tr>
          <tr>
            <td className="px-3 py-1">L</td>
            <td className="px-3 py-1">69</td>
            <td className="px-3 py-1">52</td>
            <td className="px-3 py-1">64</td>
            <td className="px-3 py-1">63</td>
          </tr>
          <tr>
            <td className="px-3 py-1">XL</td>
            <td className="px-3 py-1">71</td>
            <td className="px-3 py-1">54</td>
            <td className="px-3 py-1">66</td>
            <td className="px-3 py-1">65</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
