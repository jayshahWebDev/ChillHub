const SidebarItem = ({ name, category, path, selectedPath }) => {
  return (
    <div
      className={`py-[5px] px-[10px] ml-[5%] mr-[5%] ${
        category === name ? "bg-lightWhite" : ""
      } hover:bg-lightWhite rounded-[10px] cursor-pointer flex items-center gap-x-[20px]`}
    >
      <svg viewBox="0 0 24 24" className={`h-[24px]`}>
        <path d={category === name ? selectedPath : path}></path>
      </svg>
      <p className="text-[18px]">{name}</p>
    </div>
  );
};

export default SidebarItem;
