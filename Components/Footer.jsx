import { Fot1, Fot2 } from "@/Components/index";

export default () => {
  const footerNavs = [
    {
      href: "#",
      name: "Terms",
    },
    {
      href: "#",
      name: "License",
    },
    {
      href: "#",
      name: "Privacy",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <a href="http://localhost:3000/">
            <img src="https://www.shutterstock.com/image-illustration/supply-chain-concept-image-text-260nw-1776514838.jpg" className="w-32" />
            </a>
            <p className="max-w-ml">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus unde ratione quod, totam consectetur nisi!
            </p>
            <ul className="flex flex-wrap items-center-gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li className="text-gray-800 hover:text-gray-500 duration-150">
                  <a key={idx} href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the App</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="#">
                <Fot1 />
              </a>
              <a href="#" className="mt-0 block sm:mt-3">
                <Fot2 />
              </a>
            </div>
          </div> */}
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p>©️ 2024 Food Supply Chain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};