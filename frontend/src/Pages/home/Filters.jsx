import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineAntDesign } from 'react-icons/ai'
import { BiSolidHomeSmile, BiSolidParking } from 'react-icons/bi'
import { BsFillBalloonHeartFill, BsTropicalStorm } from 'react-icons/bs'
import { FaHouseFire } from 'react-icons/fa6'
import { GiAzulFlake, GiBowlingStrike, GiCampingTent, GiCastle, GiCaveEntrance, GiFarmTractor, GiIsland, GiWindTurbine } from 'react-icons/gi'
import { LiaGolfBallSolid, LiaStreetViewSolid, LiaSwimmingPoolSolid } from 'react-icons/lia'
import { MdCabin, MdOutlineBedroomParent } from 'react-icons/md'
import { TbBeach, TbHomeShield, TbUfo } from 'react-icons/tb';
import { GetAllHome } from '../../ApiCalls/home'
import { useDispatch, useSelector } from 'react-redux'
import { SetHomes } from '../../Redux/HomeSlice'

const Filters = () => {
    const dispatch = useDispatch();
    const {region} = useSelector((state)=>state.region);

    const getFilterData=async(filters)=>{
        try {
            const response = await GetAllHome({Category:filters,region:region});
            if (response.success) {
                dispatch(SetHomes(response.data));
            } else {
            throw new Error("Couldn't gets all homes");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Box pl={10} pr={10} pt={4}>
         <Box>
            <Flex alignItems={'center'} gap={5} overflowX={'scroll'}>
 
                <Box cursor={'pointer'} onClick={()=>getFilterData('')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <BsFillBalloonHeartFill size={24}/>
                    <Text fontSize={'xs'} pb={1}>All</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Camping')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiCampingTent size={24}/>
                    <Text fontSize={'xs'} pb={1}>Camping</Text>
                    </Flex>
                </Box>
 
                <Box cursor={'pointer'} onClick={()=>getFilterData('Rooms')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <MdOutlineBedroomParent size={24}/>
                    <Text fontSize={'xs'}>Rooms</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Cabins')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <MdCabin size={24}/>
                    <Text fontSize={'xs'}>Cabins</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Amazing pools')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <LiaSwimmingPoolSolid size={24}/>
                    <Text fontSize={'xs'}>Amazing pools</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Farms')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiFarmTractor size={24}/>
                    <Text fontSize={'xs'}>Farms</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Amazing Views')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <LiaStreetViewSolid size={24}/>
                    <Text fontSize={'xs'}>Amazing Views</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Lakefront')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiAzulFlake size={24}/>
                    <Text fontSize={'xs'}>Lakefront</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('OMG!')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <TbUfo size={24}/>
                    <Text fontSize={'xs'}>OMG!</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Beachfront')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <TbBeach size={24}/>
                    <Text fontSize={'xs'}>Beachfront</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Tiny homes')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <BiSolidHomeSmile size={24}/>
                    <Text fontSize={'xs'}>Tiny homes</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Historical homes')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <TbHomeShield size={24}/>
                    <Text fontSize={'xs'}>Historical homes</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Trending')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <FaHouseFire size={24}/>
                    <Text fontSize={'xs'}>Trending</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Tropical')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <BsTropicalStorm size={24}/>
                    <Text fontSize={'xs'}>Tropical</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('National parks')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <BiSolidParking size={24}/>
                    <Text fontSize={'xs'}>National parks</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Caves')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiCaveEntrance size={24}/>
                    <Text fontSize={'xs'}>Caves</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Islands')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiIsland size={24}/>
                    <Text fontSize={'xs'}>Islands</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Castles')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiCastle size={24}/>
                    <Text fontSize={'xs'}>Castles</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Design')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <AiOutlineAntDesign size={24}/>
                    <Text fontSize={'xs'}>Design</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Play')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiBowlingStrike size={24}/>
                    <Text fontSize={'xs'}>Play</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Windmills')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <GiWindTurbine size={24}/>
                    <Text fontSize={'xs'}>Windmills</Text>
                    </Flex>
                </Box>

                <Box cursor={'pointer'} onClick={()=>getFilterData('Golfing')}>
                    <Flex alignItems={'center'} direction={'column'}>
                    <LiaGolfBallSolid size={24}/>
                    <Text fontSize={'xs'}>Golfing</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    </Box>
  )
}

export default Filters