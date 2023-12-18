

const Header = () => {
    return(
        <>
        <div className="items-stretch shadow-sm bg-white flex w-full flex-col px-6 py-5 max-md:max-w-full max-md:px-5">
    
        <div className="items-stretch flex justify-between gap-5 mt-6 pr-3.5 max-md:max-w-full max-md:flex-wrap">
        <div className="self-stretch flex items-stretch justify-end gap-5 max-md:max-w-full max-md:flex-wrap">
            <div className="items-start border border-[color:var(--gray-200,#E5E7EB)] shadow-md bg-white flex justify-between gap-4 pl-6 pr-2 py-2 rounded-[1000px] border-solid max-md:justify-center max-md:pl-5">
              <div className="text-black text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                Bordeaux
              </div>
              <div className="text-black text-sm font-medium leading-5 self-center my-auto">
                Feb 19-26
              </div>
              <div className="text-black text-sm font-medium leading-5 self-center my-auto">
                2 guests
              </div>
              <div className="justify-center items-center self-stretch shadow-sm bg-rose-600 flex aspect-square flex-col w-8 h-8 px-1.5 rounded-[100px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a0dea0ddc54c3f9a4f7e395405e7194fead683a89cc29a5428a6a4b8e67a9f8?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                  className="aspect-square object-contain object-center w-full overflow-hidden"
                />
              </div>
            </div>
            {/* <div className="justify-end items-stretch flex gap-4 pl-20 max-md:max-w-full max-md:flex-wrap max-md:pl-5">
              <div className="text-black text-sm font-medium leading-5 self-center grow whitespace-nowrap my-auto">
                Become a Host
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e6875fa2cf4225b8651e5b60638488dbf76ca42a575a25b1180ad99cc07db86?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
              />
              
            </div> */}
          </div>
          <div className="items-center flex justify-between gap-2">
            
            <div className="justify-between items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white flex gap-2 px-4 py-2 rounded-[100px] border-solid">
              <div className="text-gray-700 text-sm leading-5">Price</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fc6761cbef99531a130acadbffe4c2f904042a1eba72712e7c4e485bbacbdd9?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
              />
            </div>
            <div className="justify-between items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white flex gap-2 px-4 py-2 rounded-[100px] border-solid">
              <div className="text-gray-700 text-sm leading-5 grow whitespace-nowrap">
                Type of place
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/876bb7c7a170dd53c36b5c1fa6384f058b74732af1df5ad686eb9d60eaee7d08?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
              />
            </div>
          </div>
          <div className="items-center flex gap-2 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white grow px-4 py-2 rounded-[100px] border-solid">
              Free cancellation
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white aspect-[1.5833333333333333] px-4 py-2 rounded-[100px] border-solid">
              Wifi
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white px-4 py-2 rounded-[100px] border-solid">
              Kitchen
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white grow px-4 py-2 rounded-[100px] border-solid">
              Air conditioning
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white px-4 py-2 rounded-[100px] border-solid">
              Washer
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white aspect-[1.6111111111111112] px-4 py-2 rounded-[100px] border-solid">
              Iron
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white grow px-4 py-2 rounded-[100px] border-solid">
              Dedicated workspace
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white grow px-4 py-2 rounded-[100px] border-solid">
              Free parking
            </div>
            <div className="text-gray-700 text-sm leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white aspect-[1.9166666666666667] px-4 py-2 rounded-[100px] border-solid">
              Dryer
            </div>
            <div className="justify-between items-stretch border border-[color:var(--gray-200,#E5E7EB)] shadow-sm bg-white flex gap-2 px-4 py-2 rounded-[100px] border-solid">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/afb4a992445ea5fee2aef5a62f6f56d40d619dc18f4754649713edc158753ab4?apiKey=06bef42c624743a9888f5d8e0d15a6ad&"
                className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
              />
              <div className="text-gray-700 text-sm leading-5">Filters</div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
 
export default Header;