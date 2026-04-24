import { Logo } from '@/components/logo'

export default function LeftSideLogin() {
  return (
    <div className='relative hidden lg:flex flex-col justify-between w-1/2 shrink-0 bg-primary p-10 text-white'>
      <Logo />
      <div className='space-y-4'>
        <p className='text-xs font-semibold tracking-widest uppercase text-white/60'>
          Painel de Acompanhamento
        </p>
        <h2 className='text-4xl font-bold leading-tight'>
          Crianças acompanhadas, <br />
          em um só lugar.
        </h2>
        <p className='text-sm text-white/70 max-w-xs'>
          Saúde, educação e assistência social cruzadas para o atendimento dos técnicos.
        </p>
      </div>

      <p className='text-xs text-white/50'>Prefeitura do Rio de Janeiro</p>
    </div>
  )
}
