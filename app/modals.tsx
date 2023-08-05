import Image from 'next/image';
import { ModalsPropsType } from "./type";
import { findProfileImageById } from "./utils";

const EditModal = ({ user, onClose }: ModalsPropsType) => {
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg px-4 sm:px-8 pt-4 sm:pt-8 pb-0 m-4 max-w-lg w-full">
                <div className="flex items-center gap-4 mb-4">
                <Image src={findProfileImageById(user?.id!)} alt={user?.username!} width={40} height={40} className='rounded-full' />
                <h2 className="text-xl font-semibold text-secondary">
                    Edit <span className='font-bold'>{user?.name}</span> Info
                </h2>
                </div>
                <form className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-secondary-50'>Name</label>
                        <input type="text" className='border rounded-lg px-4 py-2 focus:outline-0' defaultValue={user?.name} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-secondary-50'>Username</label>
                        <input type="text" className='border rounded-lg px-4 py-2 focus:outline-0' defaultValue={user?.username} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-secondary-50'>Email</label>
                        <input type="email" className='border rounded-lg px-4 py-2 focus:outline-0' defaultValue={user?.email} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-secondary-50'>Phone</label>
                        <input type="text" className='border rounded-lg px-4 py-2 focus:outline-0' defaultValue={user?.phone} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-secondary-50'>Website</label>
                        <input type="text" className='border rounded-lg px-4 py-2 focus:outline-0' defaultValue={user?.website} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-secondary-50'>Company</label>
                        <input type="text" className='border rounded-lg px-4 py-2 focus:outline-0' defaultValue={user?.company?.name} />
                    </div>
                </form>
                <div className="flex justify-end gap-4 mt-8 mb-4">
                    <button className='px-4 py-2 rounded-lg border bg-primary color-tertiary-50' onClick={onClose}>Save</button>
                    <button className='px-4 py-2 rounded-lg border bg-red-700 text-white' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
};

const DeleteModal = ({ user, onClose, onDelete }: ModalsPropsType) => {
    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg px-4 sm:px-8 pt-4 sm:pt-8 pb-0 m-4 max-w-lg w-full">
                <h2 className="text-xl font-semibold text-secondary mb-4">
                    Delete Confirmation
                </h2>
                <p className="text-gray-700 mb-4">
                    Are You Sure, you want to delete <span className='font-bold'>{user?.name}{"'s"}</span> Info?
                </p>
                <div className="flex justify-end gap-4 mt-8 mb-4">
                    <button className='px-4 py-2 rounded-lg border bg-red-700 text-white' onClick={onDelete}>Delete</button>
                    <button className='px-4 py-2 rounded-lg border bg-secondary-50 text-white' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
};

export { EditModal, DeleteModal }