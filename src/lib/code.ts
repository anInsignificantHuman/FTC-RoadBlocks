export const tab = (n: number, size = 4) => (" ".repeat(4)).repeat(n);

export const roadrunnerCode = `public class RoadrunnerOpMode extends LinearOpMode {
    // Generated by FTC Roadblocks: [URL]
    // Made with <3 by Team 4017 Sewanhaka RoboPandas
    @Override
    public void runOpMode() {
        SampleMecanumDrive drive = new SampleMecanumDrive(hardwareMap);
  
        TrajectorySequence trajSeq = drive.trajectorySequenceBuilder(new Pose2d(0, 0, 0)).build(); 
  
        waitForStart();
  
        if(isStopRequested()) return;
  
        drive.followTrajectory(trajSeq);
    }
}
`;

export const meepmeepCode = `public class MeepMeepTest {
    // Generated by FTC Roadblocks: [URL]
    // Made with <3 by Team 4017 Sewanhaka RoboPandas
    public static void main(String[] args) { 
        MeepMeep meepMeep = new MeepMeep(700);

        RoadRunnerBotEntity myBot = new DefaultBotBuilder(meepMeep)
                // TODO: Set bot constraints: maxVel, maxAccel, maxAngVel, maxAngAccel, track width
                .setConstraints(36, 36, Math.PI, Math.PI, 13)
                .followTrajectorySequence(drive -> 
                        drive.trajectorySequenceBuilder(new Pose2d(0, 0, 0)).build()
                );
                
        meepMeep.setBackground(MeepMeep.Background.FIELD_POWERPLAY_OFFICIAL)
                .setDarkMode(true)
                .setBackgroundAlpha(0.95f)
                .addEntity(myBot)
                .start();
    }
}
`