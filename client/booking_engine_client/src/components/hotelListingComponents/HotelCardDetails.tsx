

const HotelCardDetails = () =>{
    return(
        <>
         <div className="flex flex-col items-stretch w-[41%] max-md:w-full max-md:ml-0">
                    <div className="justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] flex grow flex-col w-full rounded-xl border-solid max-md:mt-6">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b7c74adee4b70b94feffd90882dc7761812aa653a01d653e644f53846efa3637?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                        className="aspect-[1.5] object-contain object-center w-full overflow-hidden"
                      />
                    </div>
                  </div>
        <div className="flex flex-col items-stretch w-[59%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex flex-col max-md:max-w-full max-md:mt-6">
                      <div className="items-stretch flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                        <div className="items-stretch flex grow basis-[0%] flex-col">
                          <div className="text-gray-500 text-sm leading-5 whitespace-nowrap">
                            Entire home in Bordeaux
                          </div>
                          <div className="text-gray-700 text-xl font-medium leading-8 whitespace-nowrap">
                            Bordeaux Getaway
                          </div>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/56ddb93704015bc5aa2d1980117cb1ea3de2b2472d0b803982b0b3bfe5ce19c4?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                          className="aspect-square object-contain object-center w-8 overflow-hidden shrink-0 max-w-full self-start"
                        />
                      </div>
                      <div className="bg-gray-200 shrink-0 h-px mt-4 max-md:max-w-full" />
                      <div className="text-gray-500 text-sm leading-5 whitespace-nowrap mt-4 max-md:max-w-full">
                        4-6 guests · Entire Home · 5 beds · 3 bath
                      </div>
                      <div className="text-gray-500 text-sm leading-5 whitespace-nowrap max-md:max-w-full">
                        Wifi · Kitchen · Free Parking
                      </div>
                      <div className="bg-gray-200 shrink-0 h-px mt-4 max-md:max-w-full" />
                      <div className="justify-between flex gap-4 mt-4 items-start max-md:max-w-full max-md:flex-wrap">
                        <div className="items-stretch flex gap-1 mt-2 max-md:justify-center">
                          <div className="text-gray-700 text-sm font-medium leading-5">
                            5.0
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0a44fce741041bdc50d45c261372d5c3d8837de546a7731cf0b6f3b762063d0?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                            className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                          />
                          <div className="text-gray-700 text-sm leading-5 grow shrink basis-auto">
                            (318 reviews)
                          </div>
                        </div>
                        <div className="justify-between items-stretch self-stretch flex gap-2">
                          <div className="text-gray-700 text-lg font-medium leading-7 grow whitespace-nowrap">
                            $325
                          </div>
                          <div className="text-gray-700 text-sm leading-5 self-center grow whitespace-nowrap my-auto">
                            /night
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></>
    )
}

export default HotelCardDetails;