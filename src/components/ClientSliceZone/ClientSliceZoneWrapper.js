
export default function ClientSliceZoneWrapper({ children, className }) {
  return (
    <div className={className}>
        { children }
    </div>
  )
}
