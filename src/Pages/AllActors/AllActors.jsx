import React, { useState, useEffect, useContext } from 'react'

import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

import DeleteModal from './../../Components/DeleteModal/DeleteModal';
import LoadingContext from './../../Contexts/LoadingContext';
import Tooltip from './../../Components/Tooltip/Tooltip';

import { addCast, deleteCast, getCasts } from './../../Services/Axios/Requests/Actors';

export default function AllActors() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [actors, setActors] = useState(null)
  const [filteredActors, setFilteredActors] = useState(null)
  const [getActorsFlag, setGetActorsFlag] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [searchType, setSearchType] = useState('ID')
  const [actorObj, setActorObj] = useState(null)

  const { loading, setLoading } = useContext(LoadingContext)

  const DeleteActorHandler = async () => {
    try {
      const res = await deleteCast(actorObj.id)

      console.log(res)
      setShowDeleteModal(false)
      setGetActorsFlag(prev => !prev)

    } catch (err) {
      console.log('fetch error')
    }
  }

  useEffect(() => {
    const getActorInfo = async () => {
      try {
        const data = await getCasts()

        if (data.length > 0) {
          let sortedActors = data.sort((a, b) => b.id - a.id)
          setActors(sortedActors)
          setFilteredActors(sortedActors)
          setIsPending(false)
        } else {
          setIsPending(true)
        }
        setError(false)
      } catch (err) {
        console.log('fetch error')
        setError(err)
        setIsPending(false)
        setActors(null)
        setFilteredActors(null)
      }
    }

    setIsPending(true)
    getActorInfo()
  }, [getActorsFlag])

  useEffect(() => {
    if (searchValue && actors) {
      let filteredActorsArray = actors.filter(actor => searchType == 'ID' ? actor.id == searchValue : actor.fullName.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredActors(filteredActorsArray)
    } else {
      setFilteredActors(actors)
    }
  }, [searchValue, searchType])

  useEffect(() => {
    if (actors?.length > 0 && loading) {
      setLoading(false)
    }
  }, [actors])

  return (
    <>
      <div className="w-full panel-box py-4 px-5 flex flex-col gap-7 mb-12">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-gray-700 dark:text-white font-vazir text-xl">هنر پیشه ها</h2>
          <a href="/my-account/adminPanel/actors/add-actor" className="inline-block px-2 py-1 rounded-md cursor-pointer font-vazir text-white dark:text-primary bg-sky-500 hover:bg-sky-600 transition-colors">افزودن هنرپیشه جدید</a>
        </div>
        <div className="w-full flex flex-col items-center gap-7 sm:gap-5 lg:gap-4">

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-7 sm:gap-5 lg:gap-4">
            <div className="w-full md:w-fit relative flex items-center justify-center gap-1">
              <select
                name=""
                id=""
                className="w-full md:min-w-52 rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
              >
                <option value="ID">ID</option>
                <option value="fullName">نام هنر پیشه</option>
              </select>
              <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو بر اساس</span>
            </div>

            <div className="w-full relative select-none">
              <input
                type="text"
                className="w-full rounded-md p-3 border border-light-gray dark:border-gray-600 dark:bg-secondary bg-white text-light-gray dark:text-white outline-none peer focus:border-sky-500 focus:text-sky-500 transition-colors"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              <span className="absolute peer-focus:text-sky-500 transition-all -top-3 right-2 font-vazir px-2 text-light-gray dark:text-gray-600 bg-white dark:bg-secondary">جستجو</span>
            </div>
          </div>

          <div className="w-full py-3 px-2 rounded-lg border border-gray-200 dark:border-white/5 overflow-scroll lg:overflow-clip">
            <table className="w-full">
              <thead className="min-w-full">
                <tr className="py-1 px-2 border-b border-gray-200 dark:border-white/5" >
                  <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">#</th>
                  <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">نام هنرپیشه</th>
                  <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">ملیت</th>
                  <th className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">تاریخ تولد</th>
                  <th className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400">Action</th>
                </tr>
              </thead>
              {(!isPending && filteredActors) && (
                <tbody>
                  {filteredActors?.map(actor => (
                    <tr key={actor.id} className="py-1 px-2 border-b last:border-none border-gray-200 dark:border-white/5" >
                      <td className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center">{actor.id}</td>
                      <td className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center">{actor.fullName}</td>
                      <td className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center">{actor.nationality}</td>
                      <td className="text-nowrap py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center">{actor.birthDate || 'نامشخص'}</td>
                      <td className="py-1 pb-3 px-2 text-sm text-light-gray dark:text-gray-400 text-center flex items-center justify-center gap-2">
                        <Tooltip text="مشاهده جزئیات">
                          <a
                            href={`/my-account/adminPanel/actors/actor-details/${actor.id}`}
                            className="inline-block p-1 rounded-md cursor-pointer bg-green-200 hover:bg-green-500 transition-colors group"
                          >
                            <FaEye className="text-green-500 group-hover:text-white transition-all" />
                          </a>
                        </Tooltip>

                        <Tooltip text="ویرایش هنرپیشه">
                          <a
                            href={`/my-account/adminPanel/actors/edit-actor/${actor.id}`}
                            className="inline-block p-1 rounded-md cursor-pointer bg-sky-200 hover:bg-sky-500 transition-colors group"
                          >
                            <MdEdit className="text-sky-500 group-hover:text-white transition-all" />
                          </a>
                        </Tooltip>

                        <Tooltip text="حذف هنرپیشه">
                          <button
                            className="inline-block p-1 rounded-md cursor-pointer bg-red-200 hover:bg-red-500 transition-colors group"
                            onClick={e => {
                              setActorObj(actor)
                              setShowDeleteModal(true)
                            }}
                          >
                            <LuTrash2 className="text-red-500 group-hover:text-white transition-all" />
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>

            {(!isPending && filteredActors.length == 0) && (
              <h2 className="text-center w-full font-vazir text-red-500 text-sm mt-5">کاربری با {searchType == 'ID' ? searchType : 'نام'} برابر "{searchValue}" پیدا نشد</h2>
            )}

            {isPending && (
              <h2 className="text-center w-full font-vazir text-red-500 text-sm mt-5">در حال دریافت اطلاعات ... </h2>
            )}

            {error && (
              <h2 className="text-center w-full font-vazir text-red-500 text-sm">{error.message}</h2>
            )}
          </div>

        </div>
      </div>

      <DeleteModal deleteHandler={DeleteActorHandler} showModal={showDeleteModal} setShowModal={setShowDeleteModal} name={actorObj?.fullName} tableName="هنرپیشه" />
    </>
  )
}
