// import { Star } from '../../../utils/Star'
import { ChampionHoverInfoProps } from '../../types'

interface ChampionStatsGridProps extends ChampionHoverInfoProps {}

const StatRow = ({ label, icon, value, size }: { label: string; icon?: string; value: React.ReactNode; size: string; }) => {
  return (
    <div className='flex flex-col justify-center items-center px-2 py-1'>
      <p className='text-white text-[0.8rem] font-[500]'>{label}</p>
        <div className='flex items-center'>
        <img src={icon} alt={`${label} icon`} className={size} />
          <p className='text-white text-[0.75rem] font-[400]'>{value}</p>
        </div>
    </div>
  )
}

export const ChampionStatsGrid = ({ stats, starLevelStats, starLevel }: ChampionStatsGridProps) => {
  return (
    <div>

      {/* Key Stars. May Or May Not Use */}

      {/* <div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <p>Key</p>
          <div className='flex items-center gap-1'>
            <div className='flex items-center gap-1'>
              <Star textColor='text-gray-500' fillColor='fill-gray-500' />
              <p>/</p>
            </div>
            <div className='flex items-center gap-1'>
              <Star textColor='text-gray-500' fillColor='fill-gray-500' />
              <Star textColor='text-gray-500' fillColor='fill-gray-500' />
              <p>/</p>
            </div>
            <div className='flex items-center gap-1'>
              <Star textColor='text-yellow-500' fillColor='fill-yellow-500' />
              <Star textColor='text-yellow-500' fillColor='fill-yellow-500' />
              <Star textColor='text-yellow-500' fillColor='fill-yellow-500' />
            </div>
          </div>
        </div>
      </div> */}

      {/* Stats */}
      <div className='grid grid-rows-5 grid-cols-2'>
        <StatRow 
          label='Health' 
          icon='../assets/icons/health.png'
          value={`${starLevelStats?.oneStar.health}/${starLevelStats?.twoStar.health}/${starLevelStats?.threeStar.health}`} 
          size='w-6 h-6'
        />
        <StatRow 
          label='Mana' 
          icon='../assets/icons/mana.png'
          value={`${stats?.mana}/${stats?.abilityManaCost}`} 
          size='w-5 h-5'
        />
        <StatRow 
          label='Attack Damage' 
          icon='../assets/icons/attack.png'
          value={`${starLevelStats?.oneStar.attackDamage}/${starLevelStats?.twoStar.attackDamage}/${starLevelStats?.threeStar.attackDamage}`} 
          size='w-5 h-5'
        />
        <StatRow 
          label='Ability Power' 
          icon='../assets/icons/abilitypower.png'
          value={stats?.abilityPower} 
          size='w-4 h-4'
        />
        <StatRow 
          label='Armor' 
          icon='../assets/icons/armor.png'
          value={starLevelStats?.oneStar.armor}
          size='w-5 h-5'
        />
        <StatRow 
          label='Magic Resist' 
          icon='../assets/icons/magicresist.png'
          value={starLevelStats?.oneStar.magicResist}
          size='w-6 h-6'
        />
        <StatRow
          label='Attack Speed' 
          icon='../assets/icons/attackspeed.png'
          value={stats?.attackSpeed}
          size='w-5 h-5'
        />
        <StatRow
          label='Crit Chance' 
          icon='../assets/icons/criticalstrikechance.png'
          value={`${stats?.attackCritChance}%`}
          size='w-5 h-5'
        />
        <StatRow
          label='Crit Damage' 
          icon='../assets/icons/criticaldamage.svg'
          value={`${stats?.attackCritDamage}%`}
          size='w-5 h-5'
        />
        <StatRow
          label='Range'
          icon='../assets/icons/range.png'
          value={stats?.range}
          size='w-4 h-4'
        />
      </div>
    </div>
  )
}
