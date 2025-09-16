import React, { useEffect, useRef } from 'react';
import type { LocationMapProps } from '@/types/components/contact';

// 카카오맵 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const LocationMap: React.FC<LocationMapProps> = ({
  className = '',
  lat = 37.6584,
  lng = 126.832,
  level = 3,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return; // container가 없으면 리턴

    // script 태그 로드 시점 제어
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_API
    }&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: level,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도에 표시
        marker.setMap(map);
      });
    };
    document.head.appendChild(script);

    // cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [lat, lng, level]);

  return (
    <div
      className={`bg-gray-200 rounded-lg overflow-hidden border border-gray-200 relative ${className}`}
    >
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} className="rounded-lg" />
    </div>
  );
};

export default LocationMap;
