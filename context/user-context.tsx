"use client"

import { createContext, useContext } from "react"

interface UserContextType {
  userId: string
}

export const UserContext = createContext<UserContextType>({ userId: "" })

export const useUserContext = () => useContext(UserContext)
