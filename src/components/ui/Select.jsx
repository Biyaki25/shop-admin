import { useEffect, useId, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import './Select.css'

/**
 * Custom dropdown for the Category / Stock / Sort by filters.
 *
 * The mock-up shows a styled popup list with a check mark next to the chosen
 * option, which a native <select> can't do, so this follows the WAI-ARIA
 * "select-only combobox" pattern:
 *  - The trigger button shows the small label and the current value.
 *  - ↑/↓/Home/End move through options, Enter/Space choose, Escape/Tab close.
 *  - Typing a letter jumps to the first option starting with it.
 */
export default function Select({ label, value, options, onChange, className = '' }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const id = useId()
  const labelId = `${id}-label`
  const listId = `${id}-list`

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value))
  const selected = options[selectedIndex]

  // Close when the user clicks anywhere outside the dropdown.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Keep the highlighted option scrolled into view.
  useEffect(() => {
    if (open) listRef.current?.children[activeIndex]?.scrollIntoView?.({ block: 'nearest' })
  }, [open, activeIndex])

  const openList = (index = selectedIndex) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const choose = (index) => {
    onChange(options[index].value)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const handleKeyDown = (event) => {
    const last = options.length - 1
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault()
        openList()
      }
      return
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((i) => Math.min(last, i + 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((i) => Math.max(0, i - 1))
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(last)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        choose(activeIndex)
        break
      case 'Escape':
        event.preventDefault()
        setOpen(false)
        break
      case 'Tab':
        setOpen(false)
        break
      default:
        // Type-ahead: jump to the first option starting with the typed letter.
        if (event.key.length === 1) {
          const match = options.findIndex((o) => o.label.toLowerCase().startsWith(event.key.toLowerCase()))
          if (match !== -1) setActiveIndex(match)
        }
    }
  }

  return (
    <div ref={rootRef} className={`select ${open ? 'is-open' : ''} ${className}`.trim()}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? `${id}-opt-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
      >
        <span className="select__text">
          <span id={labelId} className="select__label">
            {label}
          </span>
          <span className="select__value">{selected?.label}</span>
        </span>
        <Icon name="chevron-down" size={14} className="select__chevron" />
      </button>

      <ul ref={listRef} id={listId} role="listbox" aria-labelledby={labelId} className="select__list" hidden={!open}>
        {options.map((option, index) => {
          const isSelected = index === selectedIndex
          return (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={isSelected}
              className={`select__option ${index === activeIndex ? 'is-active' : ''}`.trim()}
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => choose(index)}
            >
              {option.label}
              {isSelected && <Icon name="check" size={14} className="select__check" />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
