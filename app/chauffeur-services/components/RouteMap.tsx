// "use client";

// import {
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { useEffect, useRef, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// // import AirportAssistPin from "./AirportAssistPin";

// const center = { lat: 30.0444, lng: 31.2357 }; // Cairo

// export default function RouteMap({ className }: { className?: string }) {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries: ["places"],
//   });
//   const mapStyles: google.maps.MapTypeStyle[] = [
//     {
//       featureType: "administrative",
//       elementType: "all",
//       stylers: [{ hue: "#000000" }, { lightness: -100 }, { visibility: "off" }],
//     },
//     {
//       featureType: "landscape",
//       elementType: "geometry",
//       stylers: [
//         { hue: "#dddddd" },
//         { saturation: -100 },
//         { lightness: -3 },
//         { visibility: "on" },
//       ],
//     },
//     {
//       featureType: "landscape",
//       elementType: "labels",
//       stylers: [
//         { hue: "#000000" },
//         { saturation: -100 },
//         { lightness: -100 },
//         { visibility: "off" },
//       ],
//     },
//     {
//       featureType: "poi",
//       elementType: "all",
//       stylers: [
//         { hue: "#000000" },
//         { saturation: -100 },
//         { lightness: -100 },
//         { visibility: "off" },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry",
//       stylers: [
//         { hue: "#7B5A41" },
//         { saturation: -100 },
//         { lightness: 26 },
//         { visibility: "on" },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "labels",
//       stylers: [
//         { hue: "#7B5A41" },
//         { saturation: 100 },
//         //{ lightness: 0 },
//         { visibility: "on" },
//       ],
//     },
//     {
//       featureType: "road.local",
//       elementType: "all",
//       stylers: [
//         { hue: "#ffffff" },
//         { saturation: -100 },
//         { lightness: 100 },
//         { visibility: "on" },
//       ],
//     },
//     {
//       featureType: "transit",
//       elementType: "labels",
//       stylers: [{ hue: "#000000" }, { lightness: -100 }, { visibility: "off" }],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry",
//       stylers: [
//         { hue: "#ffffff" },
//         { saturation: -100 },
//         { lightness: 100 },
//         { visibility: "on" },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "labels",
//       stylers: [
//         { hue: "#000000" },
//         { saturation: -100 },
//         { lightness: -100 },
//         { visibility: "off" },
//       ],
//     },
//   ];
//   const CustomMarker: google.maps.Icon = {
//     url: "/Asset 1.svg", // رابط الصورة
//     scaledSize: {
//       width: 64,
//       height: 64,
//       equals: function (other: google.maps.Size | null): boolean {
//         throw new Error("Function not implemented.");
//       },
//     }, // الحجم النهائي
//     anchor: {
//       x: 32,
//       y: 64,
//       equals: function (other: google.maps.Point | null): boolean {
//         throw new Error("Function not implemented.");
//       },
//     }, // نقطة الارتكاز
//   };

//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
//   const [destination, setDestination] =
//     useState<google.maps.LatLngLiteral | null>(null);

//   const originAuto = useRef<google.maps.places.Autocomplete | null>(null);
//   //   const destAuto = useRef<google.maps.places.Autocomplete | null>(null);

//   const [directions, setDirections] =
//     useState<google.maps.DirectionsResult | null>(null);

//   const calculateRoute = async () => {
//     if (!origin || !destination) return;

//     const service = new google.maps.DirectionsService();
//     const result = await service.route({
//       origin,
//       destination,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });

//     setDirections(result);
//   };

//   const handleMapClick = (e: google.maps.MapMouseEvent) => {
//     if (!e.latLng) return;
//     const point = e.latLng.toJSON();

//     if (!origin) {
//       setOrigin(point);
//       console.log("Origin set to:", point);
//     } else if (!destination) {
//       setDestination(point);
//       console.log("Destination set to:", point);
//     }
//   };

//   const handleOriginDragEnd = (e: google.maps.MapMouseEvent) => {
//     if (!e.latLng) return;
//     const newPosition = e.latLng.toJSON();
//     setOrigin(newPosition);
//     console.log("Origin moved to:", newPosition);
//   };

//   const handleDestinationDragEnd = (e: google.maps.MapMouseEvent) => {
//     if (!e.latLng) return;
//     const newPosition = e.latLng.toJSON();
//     setDestination(newPosition);
//     console.log("Destination moved to:", newPosition);
//   };

//   useEffect(() => {
//     calculateRoute();
//   }, [origin, destination]);

//   const flyTo = (point: google.maps.LatLngLiteral | null, zoom = 16) => {
//     if (!map || !point) return;

//     map.panTo(point);
//     setTimeout(() => map.setZoom(zoom), 300);
//   };

//   // Reset all pins and directions
//   const handleReset = () => {
//     setOrigin(null);
//     setDestination(null);
//     setDirections(null);
//     // setSearchValue("");
//     // if (inputRef.current) {
//     //   inputRef.current.value = "";
//     // }
//     // Reset map view to center
//     if (map) {
//       map.panTo(center);
//       map.setZoom(12);
//     }
//   };

//   if (!isLoaded) return <div>Loading map…</div>;
//   return (
//     <div className={`grid gap-4 ${className}`}>
//       {/* Inputs */}
//       <div className="">
//         <Autocomplete
//           onLoad={(auto) => (originAuto.current = auto)}
//           onPlaceChanged={() => {
//             const place = originAuto.current?.getPlace();
//             if (!place?.geometry?.location || !map) return;

//             const location = place.geometry.location.toJSON();

//             // فقط تحريك الكاميرا بدون تعيين النقطة
//             map.panTo(location);
//             setTimeout(() => map.setZoom(16), 300);
//           }}
//         >
//           <Input placeholder="Search to navigate" />
//         </Autocomplete>
//       </div>
//       <div className="grid md:grid-cols-5 gap-4">
//         <Button
//           type="button"
//           className="col-span-2"
//           onClick={() => flyTo(origin)}
//           disabled={!origin}
//         >
//           A point
//         </Button>
//         <Button
//           type="button"
//           className="col-span-2"
//           onClick={() => flyTo(destination)}
//           disabled={!destination}
//         >
//           B point
//         </Button>
//         <Button
//           className="col-span-1"
//           type="button"
//           onClick={handleReset}
//           disabled={!origin && !destination}
//         >
//           Reset
//         </Button>
//       </div>
//       {/* Map */}
//       <div className="h-[500px] w-full rounded-xl overflow-hidden border">
//         <GoogleMap
//           center={center}
//           zoom={12}
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           onLoad={(map) => setMap(map)}
//           onClick={handleMapClick}
//           options={{
//             styles: mapStyles,
//             fullscreenControl: false,
//             disableDefaultUI: true,
//             scrollwheel: true,
//             zoomControl: true,
//             clickableIcons: false,
//           }}
//         >
//           {origin && (
//             <Marker
//               icon={CustomMarker}
//               position={origin}
//               label="A"
//               draggable={true}
//               onDragEnd={handleOriginDragEnd}
//             />
//           )}
//           {destination && (
//             <Marker
//               icon={CustomMarker}
//               position={destination}
//               label="B"
//               draggable={true}
//               onDragEnd={handleDestinationDragEnd}
//             />
//           )}

//           {directions && (
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 suppressMarkers: true,
//                 polylineOptions: {
//                   strokeColor: "#7B5A41",
//                   strokeWeight: 5,
//                   //   strokeOpacity: 1,
//                 },
//               }}
//             />
//           )}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import AirportAssistPin from "./AirportAssistPin";

// const center = { lat: 30.0444, lng: 31.2357 }; // Cairo
const center = { lat: 51.4682501605486, lng: -0.4191509550266713 }; // Cairo

export default function RouteMap({ className }: { className?: string }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  const mapStyles: google.maps.MapTypeStyle[] = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [{ hue: "#000000" }, { lightness: -100 }, { visibility: "off" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        { hue: "#dddddd" },
        { saturation: -100 },
        { lightness: -3 },
        { visibility: "on" },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels",
      stylers: [
        { hue: "#000000" },
        { saturation: -100 },
        { lightness: -100 },
        { visibility: "off" },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        { hue: "#000000" },
        { saturation: -100 },
        { lightness: -100 },
        { visibility: "off" },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { hue: "#7B5A41" },
        { saturation: -100 },
        { lightness: 26 },
        { visibility: "on" },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        { hue: "#7B5A41" },
        { saturation: 100 },
        //{ lightness: 0 },
        { visibility: "on" },
      ],
    },
    {
      featureType: "road.local",
      elementType: "all",
      stylers: [
        { hue: "#ffffff" },
        { saturation: -100 },
        { lightness: 100 },
        { visibility: "on" },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ hue: "#000000" }, { lightness: -100 }, { visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { hue: "#ffffff" },
        { saturation: -100 },
        { lightness: 100 },
        { visibility: "on" },
      ],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [
        { hue: "#000000" },
        { saturation: -100 },
        { lightness: -100 },
        { visibility: "off" },
      ],
    },
  ];
  const CustomMarker: google.maps.Icon = {
    url: "/Asset 1.svg", // رابط الصورة
    scaledSize: {
      width: 64,
      height: 64,
      equals: function (other: google.maps.Size | null): boolean {
        throw new Error("Function not implemented.");
      },
    }, // الحجم النهائي
    anchor: {
      x: 32,
      y: 64,
      equals: function (other: google.maps.Point | null): boolean {
        throw new Error("Function not implemented.");
      },
    }, // نقطة الارتكاز
  };

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<
    "origin" | "destination" | null
  >(null);

  const originAuto = useRef<google.maps.places.Autocomplete | null>(null);
  //   const destAuto = useRef<google.maps.places.Autocomplete | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const calculateRoute = async () => {
    if (!origin || !destination) return;

    const service = new google.maps.DirectionsService();
    const result = await service.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirections(result);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const point = e.latLng.toJSON();

    if (!origin) {
      setOrigin(point);
      console.log("Origin set to:", point);
    } else if (!destination) {
      setDestination(point);
      console.log("Destination set to:", point);
    }
  };

  const handleOriginDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const newPosition = e.latLng.toJSON();
    setOrigin(newPosition);
    console.log("Origin moved to:", newPosition);
  };

  const handleDestinationDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const newPosition = e.latLng.toJSON();
    setDestination(newPosition);
    console.log("Destination moved to:", newPosition);
  };

  useEffect(() => {
    calculateRoute();
  }, [origin, destination]);

  const flyTo = (point: google.maps.LatLngLiteral | null, zoom = 16) => {
    if (!map || !point) return;

    map.panTo(point);
    setTimeout(() => map.setZoom(zoom), 300);
  };

  // Calculate distance between two points
  const calculateDistance = (
    point1: google.maps.LatLngLiteral,
    point2: google.maps.LatLngLiteral,
  ): string => {
    const R = 6371; // Earth's radius in km
    const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
    const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((point1.lat * Math.PI) / 180) *
        Math.cos((point2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  // Reset all pins and directions
  const handleReset = () => {
    setOrigin(null);
    setDestination(null);
    setDirections(null);
    setSelectedMarker(null);
    // setSearchValue("");
    // if (inputRef.current) {
    //   inputRef.current.value = "";
    // }
    // Reset map view to center
    // if (map) {
    //   map.panTo(center);
    //   map.setZoom(12);
    // }
  };

  if (!isLoaded) return <div>Loading map…</div>;
  return (
    <div className={`grid gap-4 ${className}`}>
      {/* Inputs */}
      <div className="">
        <Autocomplete
          onLoad={(auto) => (originAuto.current = auto)}
          onPlaceChanged={() => {
            const place = originAuto.current?.getPlace();
            if (!place?.geometry?.location || !map) return;

            const location = place.geometry.location.toJSON();

            // فقط تحريك الكاميرا بدون تعيين النقطة
            map.panTo(location);
            setTimeout(() => map.setZoom(16), 300);
          }}
        >
          <Input placeholder="Search to navigate" />
        </Autocomplete>
      </div>
      <div className="grid md:grid-cols-5 gap-4">
        <Button
          type="button"
          className="col-span-2"
          onClick={() => flyTo(origin)}
          disabled={!origin}
        >
          A point
        </Button>
        <Button
          type="button"
          className="col-span-2"
          onClick={() => flyTo(destination)}
          disabled={!destination}
        >
          B point
        </Button>
        <Button
          className="col-span-1"
          type="button"
          onClick={handleReset}
          disabled={!origin && !destination}
        >
          Reset
        </Button>
      </div>
      {/* Map */}
      <div className="h-[500px] w-full rounded-xl overflow-hidden border">
        <GoogleMap
          center={center}
          zoom={14}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => setMap(map)}
          onClick={handleMapClick}
          options={{
            styles: mapStyles,
            fullscreenControl: false,
            disableDefaultUI: true,
            scrollwheel: true,
            zoomControl: true,
            clickableIcons: false,
          }}
        >
          {origin && (
            <>
              <Marker
                icon={CustomMarker}
                position={origin}
                label="A"
                draggable={true}
                onDragEnd={handleOriginDragEnd}
                onClick={() => setSelectedMarker("origin")}
              />
              {selectedMarker === "origin" && (
                <InfoWindow
                  position={origin}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-2">Point A</h3>
                    <div className="space-y-1 text-xs">
                      <p>
                        <strong>Lat:</strong> {origin.lat.toFixed(6)}
                      </p>
                      <p>
                        <strong>Lng:</strong> {origin.lng.toFixed(6)}
                      </p>
                      {destination && (
                        <p>
                          <strong>Distance to B:</strong>{" "}
                          {calculateDistance(origin, destination)} km
                        </p>
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </>
          )}
          {destination && (
            <>
              <Marker
                icon={CustomMarker}
                position={destination}
                label="B"
                draggable={true}
                onDragEnd={handleDestinationDragEnd}
                onClick={() => setSelectedMarker("destination")}
              />
              {selectedMarker === "destination" && (
                <InfoWindow
                  position={destination}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-2">Point B</h3>
                    <div className="space-y-1 text-xs">
                      <p>
                        <strong>Lat:</strong> {destination.lat.toFixed(6)}
                      </p>
                      <p>
                        <strong>Lng:</strong> {destination.lng.toFixed(6)}
                      </p>
                      {origin && (
                        <p>
                          <strong>Distance from A:</strong>{" "}
                          {calculateDistance(origin, destination)} km
                        </p>
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </>
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#7B5A41",
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
