"use client";

import { MoreVertical, ChevronLast, ChevronFirst, ChevronDown, ChevronRight, User, LogOut, ChevronUp } from "lucide-react"
import { useContext, createContext, useState, ReactNode, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"

interface SidebarContextType {
  expanded: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProps {
  children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const [accountExpanded, setAccountExpanded] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountExpanded(false)
      }
    }

    if (accountExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [accountExpanded])
  
  const displayName = user?.fullName || user?.firstName || user?.username || "User"
  const displayEmail = user?.primaryEmailAddress?.emailAddress || ""
  const profileImageUrl = user?.imageUrl || "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
  
  return (
    <aside className="h-full overflow-hidden">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm overflow-hidden">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto overflow-x-hidden">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t relative" ref={accountRef}>
          <div 
            className="flex p-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setAccountExpanded(!accountExpanded)}
          >
            <img
              src={profileImageUrl}
              alt={displayName}
              className="w-10 h-10 rounded-md flex-shrink-0"
            />
            {expanded && (
              <div className="flex justify-between items-center flex-1 ml-3 overflow-hidden">
                <div className="leading-4 min-w-0">
                  <h4 className="font-semibold truncate">{displayName}</h4>
                  {displayEmail && (
                    <span className="text-xs text-gray-600 truncate block">{displayEmail}</span>
                  )}
                </div>
                <ChevronUp 
                  size={16} 
                  className={`transition-transform flex-shrink-0 ml-2 ${accountExpanded ? 'rotate-180' : ''}`}
                />
              </div>
            )}
          </div>
          
          {accountExpanded && expanded && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border rounded-lg shadow-lg py-2 z-50">
              <AccountMenuItem 
                icon={<User size={16} />} 
                text="My Profile" 
                href="/profile"
              />
              <SignOutMenuItem 
                icon={<LogOut size={16} />} 
                text="Sign Out"
              />
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  icon: ReactNode
  text: string
  active?: boolean
  alert?: boolean
  href?: string
  subItems?: { text: string; href: string }[]
}

export function SidebarItem({ icon, text, active, alert, href, subItems }: SidebarItemProps) {
  const context = useContext(SidebarContext)
  const expanded = context?.expanded ?? false
  const router = useRouter()
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const hasSubItems = subItems && subItems.length > 0
  
  const isActive = active || (href && pathname === href) || (subItems && subItems.some(item => item.href === pathname))
  
  const handleClick = () => {
    if (hasSubItems) {
      setIsExpanded(!isExpanded)
    } else if (href) {
      router.push(href)
    }
  }
  
  return (
    <>
      <li
        onClick={handleClick}
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all flex-1 ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {hasSubItems && expanded && (
          <ChevronRight 
            size={16} 
            className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          />
        )}
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
      
      {hasSubItems && isExpanded && expanded && (
        <ul className="ml-6 space-y-1">
          {subItems.map((subItem, index) => {
            const isSubActive = pathname === subItem.href
            return (
              <li
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(subItem.href)
                }}
                className={`
                  relative flex items-center py-2 px-3
                  font-medium rounded-md cursor-pointer
                  transition-colors text-sm
                  ${
                    isSubActive
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                      : "hover:bg-indigo-50 text-gray-600"
                  }
                `}
              >
                <span>{subItem.text}</span>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

interface AccountMenuItemProps {
  icon: ReactNode
  text: string
  href: string
}

function AccountMenuItem({ icon, text, href }: AccountMenuItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <div
      onClick={() => router.push(href)}
      className={`
        flex items-center py-2 px-3 rounded-md cursor-pointer
        transition-colors text-sm
        ${
          isActive
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </div>
  )
}

interface SignOutMenuItemProps {
  icon: ReactNode
  text: string
}

function SignOutMenuItem({ icon, text }: SignOutMenuItemProps) {
  const { signOut } = useClerk()
  const router = useRouter()
  
  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }
  
  return (
    <div
      onClick={handleSignOut}
      className={`
        flex items-center py-2 px-3 rounded-md cursor-pointer
        transition-colors text-sm
        hover:bg-indigo-50 text-gray-600
      `}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </div>
  )
}

