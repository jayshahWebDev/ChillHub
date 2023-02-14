const SidebarItem = ({ name }) => {
  return (
    <div className="py-[5px] px-[10px] ml-[5%] mr-[5%] hover:bg-lightWhite rounded-[10px] cursor-pointer">
      <p className="text-[18px]">{name}</p>
    </div>
  );
};

export default SidebarItem;
