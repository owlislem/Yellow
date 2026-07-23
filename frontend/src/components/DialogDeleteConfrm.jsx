/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";

function DialogDeleteConfrm({
  open,
  setOpen,
  id,
  setDeleteConfirm,
  redner,
  setRender,
}) {
  const del = async () => {
    const { payload } = await axios.delete(`/api/v1/user/${id}`);
    setOpen(false);
    setDeleteConfirm(true);
    setTimeout(() => {
      setDeleteConfirm(false);
    }, 1000);
    setRender((prev) => !prev);
  };

  return (
    open && (
      <>
        <div className="inset-0 fixed bg-[rgba(0,0,0,0.5)]  flex justify-center items-center z-30">
          <div className="bg-white p-[35px] z-[100]">
            <p>Are you sure you want to delete this item?</p>
            <div className="pt-[20px] flex justify-end gap-[15px]">
              <button
                className="px-[26px] py-[15px] bg-gray-v2 rounded-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-[26px] py-[15px] bg-[#FFD600] rounded-full z-50"
                onClick={del}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default DialogDeleteConfrm;
