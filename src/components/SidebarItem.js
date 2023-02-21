const SidebarItem = ({ name, category }) => {
  return (
    <div
      className={`py-[5px] px-[10px] ml-[5%] mr-[5%] ${
        category === name ? "bg-lightWhite" : ""
      } hover:bg-lightWhite rounded-[10px] cursor-pointer`}
    >
      <p className="text-[18px]">{name}</p>
    </div>
  );
};

export default SidebarItem;
