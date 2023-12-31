"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { RxPencil1 } from 'react-icons/rx';
import { BsArrowDown } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { UserDataType } from "./type";
import { EditModal, DeleteModal } from './modals';
import Loading from "./loading";
import { findProfileImageById } from './utils';

const TableInfo = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserDataType[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);
  const totalUsers = users?.length;
  const usersPerPage = 5;
  const skip = page * usersPerPage - usersPerPage;

  useEffect(() => {
    try {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  }, []);

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    const filteredUsers = users.filter((user) => {
      const fullName = user.name.toLowerCase();
      const searchInputLower = searchInput.trim().toLowerCase();
      return fullName.includes(searchInputLower);
  });

    if (!filteredUsers || filteredUsers.length === 0) return;

    setUsers(filteredUsers);
  };

  const handleDelete = useCallback(() => {
    const filteredUsers = users.filter((user) => user.id !== selectedUser?.id);
    setUsers(filteredUsers);
    setShowDeleteModal(false);
  }, [selectedUser, users]);

  const handleEditClick = (user: UserDataType) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user: UserDataType) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  return (
    <React.StrictMode>
      <section className='bg-white rounded-2xl shadow py-8 my-12 sm:mx-6 md:mx-12'>
        <div className='container mx-auto w-full'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-2 md:px-8 mb-6'>
            <h1 className='text-primary-50 text-xl'>Members</h1>
            <div className="relative">
              <input type="search" placeholder="Search" className='border-2 border-gray-300 rounded-lg pl-10 pr-4 py-2 w-2/3 md:w-full focus:outline-0' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }} />
              <FiSearch
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-slate-400 cursor-pointer"
                size={20}
                onClick={handleSearch}
              />
            </div>
          </div>
          {loading ?
            (<Loading />)
            :
            (
              <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto'>
                  <div className='align-middle inline-block min-w-full'>
                    <div className='overflow-hidden border-b border-gray-200'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-tertiary'>
                          <tr>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-secondary-50 flex items-center gap-2'>
                              <input type="checkbox" className='h-4 w-4 mr-2' />
                              <span>Name</span>
                              <BsArrowDown className="text-bold text-lg" />
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>
                              Status
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>
                              Email
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>
                              Role
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-secondary-50'>
                              Rating
                            </th>
                            <th scope='col' className='relative px-6 py-3'>
                              <span className='sr-only'>Edit/Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {users.slice(skip, skip + usersPerPage).map((user) => (
                            <tr key={user.id}>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center gap-2'>
                                  <input type="checkbox" className='h-4 w-4 mr-2' />
                                  <div className='flex-shrink-0 h-10 w-10'>
                                    <Image src={findProfileImageById(user.id)} alt={user.username} width={40} height={40} className='rounded-full' />
                                  </div>
                                  <div className='ml-4'>
                                    <div className='text-sm font-medium text-gray-900'>{user.name}</div>
                                    <div className='text-sm text-secondary-50'>{`@${user.username}`}</div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <span className='px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-sm bg-primary text-tertiary-50'>
                                  Active
                                </span>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-500'>{user.email}</div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-secondary-50'>{user.company?.name}</td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-secondary-50'>
                                <div className='flex items-center'>
                                  <AiFillStar className='text-secondary text-2xl cursor-pointer hover:scale-105' />
                                  <AiFillStar className='text-secondary text-2xl cursor-pointer hover:scale-105' />
                                  <AiFillStar className='text-secondary text-2xl cursor-pointer hover:scale-105' />
                                  <AiFillStar className='text-secondary text-2xl cursor-pointer hover:scale-105' />
                                  <AiFillStar className='text-[#E2E8F0] text-2xl cursor-pointer hover:scale-105' />
                                </div>
                              </td>
                              <td className='px-6 py-6 whitespace-nowrap text-sm font-medium flex items-center gap-8'>
                                <button className='hover:bg-[#EDF2F7] p-1 rounded-md' onClick={() => handleDeleteClick(user)}>
                                  <RiDeleteBinLine className="h-6 w-6" />
                                </button>
                                <button className='hover:bg-[#EDF2F7] p-1 rounded-md' onClick={() => handleEditClick(user)}>
                                  <RxPencil1 className="h-6 w-6" />
                                </button>
                              </td>
                            </tr>
                          )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center gap-12 px-2 md:px-8 pt-8'>
                  <div className='hidden md:flex items-center gap-4'>
                    {/* fix pagination logic errors */}
                    <p className='text-sm text-gray-700'>
                      Showing
                      <span className='font-medium mx-1'>{skip + 1}</span>
                      to
                      <span className='font-medium mx-1'>{Math.min(skip + usersPerPage, totalUsers)}</span>
                      of
                      <span className='font-medium mx-1'>{totalUsers}</span>
                      results
                    </p>
                  </div>
                  <div className='flex items-center gap-2 justify-between grow md:grow-0'>
                    <button className='text-primary-50 px-4 py-2 rounded-lg border hover:bg-[#EDF2F7] active:bg-primary active:text-white disabled:pointer-events-none disabled:opacity-50' onClick={() => setPage(page - 1)}
                      disabled={page === 1}>
                      Previous
                    </button>
                    <button className='text-primary-50 px-4 py-2 rounded-lg border hover:bg-[#EDF2F7] active:bg-primary active:text-white disabled:pointer-events-none disabled:opacity-50' onClick={() => setPage(page + 1)}
                      disabled={Math.min(skip + usersPerPage, totalUsers) === totalUsers}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        {showEditModal && <EditModal user={selectedUser} onClose={() => setShowEditModal(false)} />}
        {showDeleteModal && <DeleteModal user={selectedUser} onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />}
      </section>
    </React.StrictMode>
  )
}

export default TableInfo;